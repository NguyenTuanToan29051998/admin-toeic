import Router, {useRouter} from 'next/router';
import React, {useState} from 'react';
import {tailwindOnly} from '../../hocs/tailwindOnly';
import {filePlay, plusIconBS} from '../../public/static/icons';
import {SortDirection} from '../../models/Common';
import {
  QuestionCreateDTO,
  QuestionDTO,
  QuestionType,
} from '../../models/admin/Question';
import {
  CollectionList,
  CollectionQuestionDTO,
  CollectionStatus,
} from '../../models/admin/Collection';
import {NextPage} from 'next';
import {collectionService, questionsService} from '../../services';
import {parseInt} from 'lodash';
import {
  QuestionChoice,
  QuestionCreate,
  QuestionUpdate,
} from '../../components/question/QuestionChoice';
import DropdownValue from '../../components/DropdownValue';
import {ExamQuestionLvl} from '../../models/admin/Exam';
import {AnswerState} from '../../components/question/AnswerBlank';

interface Props {
  collections: CollectionList;
  questions: CollectionQuestionDTO[];
  collectionId: string;
}

const Question: NextPage<Props> = ({
  collections,
  questions,
  collectionId,
}: Props) => {
  const router = useRouter();

  const [clickedSave, setClickedSave] = useState<boolean>(false);
  // state question create
  const [questionCreates, setQuestionCreates] = useState<QuestionCreate[]>([
    {
      id: '',
      priority: 1,
      type: QuestionType.SINGLE_CHOICE,
      answers: [],
      title: '',
    },
  ]);
  // state question in collection
  const [questionCollection, setQuestionCollection] = useState<
    QuestionUpdate[]
  >(
    questions?.map(v => {
      return {
        id: v.question.id,
        isView: true,
        title: v.question.title,
        type: v.question.type,
        priority: v.priority,
        answers: v.question.answers.map(a => {
          return {
            id: a.id,
            title: a.title,
            isCorrect: a.isCorrect,
            priority: a.priority,
          } as AnswerState;
        }),
      };
    }),
  );
  // don't use because router push after change
  const [collection, setCollection] = useState<{
    display: string;
    values: string | number;
  }>({
    display: collections?.data?.find(v => v.id == collectionId).title,
    values: collectionId,
  });

  // const collection: {
  //   display: string;
  //   values: string | number;
  // } = {
  //   display: collections?.data?.find(v => v.id == collectionId).title,
  //   values: collectionId,
  // };

  const collectionsTemp: {
    display: string;
    values: string | number;
  }[] = collections?.data?.map(v => {
    return {display: v.title, values: v.id};
  });

  const onSaveHandler = async (): Promise<void> => {
    // call api update question
    const questionUpdate = questionCollection?.filter(value => !value.isView);
    await Promise.all(
      questionUpdate?.map(async v => {
        const id = v.id;
        delete v.id;
        delete v.isView;
        v.answers.map(v2 => {
          if (v2.id === '') {
            delete v2.id;
          }
          return v2;
        });
        await questionsService.updateQuestion(id, v);
      }),
    );

    // call api save
    // 1. call api save question
    // TODO update more info here
    const questionCreateDTO: QuestionCreateDTO[] = questionCreates
      .filter(v => v.title !== '')
      .map(v => {
        return {
          title: v.title,
          type: v.type,
          priority: v.priority,
          answers: v.answers.map((a, i) => {
            return {
              title: a.title,
              isCorrect: a.isCorrect,
              priority: i + 1,
            };
          }),
        };
      });
    const questionCreated: QuestionDTO[] = await Promise.all(
      questionCreateDTO.map(async v => {
        return await questionsService.createQuestions(v);
      }),
    );
    // 2. call api push to collection
    await Promise.all(
      questionCreated.map(async (v, i) => {
        return await collectionService.addQuestionToCollection(
          String(collection.values),
          {
            level: ExamQuestionLvl.EASY,
            question: {id: v.id},
            priority: i + 1 + questions?.length, // continue question no
            point: 1,
          },
        );
      }),
    );

    await router.push(`/questions?collectionId=${collectionId}`);
    router.reload();
    // TODO change for API
    setClickedSave(!clickedSave);
  };

  const onRemoveHandler = async (idQuestion: string): Promise<void> => {
    // remove question from collection
    await collectionService.removeQuestInCollection(collectionId, idQuestion);
    // delete question
    await questionsService.deleteQuestion(idQuestion);

    await router.push(`/questions?collectionId=${collectionId}`);
  };

  return (
    <div className="container">
      <div className="bg-white py-4">
        <h4 className="flex text-center text-white-0A1B39 font-medium text-xl mb-4">
          Tạo mới Question
        </h4>
        <span className="text-white-0A1B39 mt-4">
          Tạo câu hỏi cho collection, cho đề thi, bài thi của bạn. Có 4 loại câu
          hỏi: Single choise, Multiple Choise, Câu hỏi nhóm, Toeic.
        </span>
      </div>
      <div className="flex items-center">
        <div className="flex flex-auto gap-5 py-5">
          <DropdownValue
            selectedOption={collection}
            data={collectionsTemp}
            setSelectedOption={(option): void => {
              // change router because call api get question again
              setCollection(option);
              router
                .push(`/questions?collectionId=${option.values}`)
                .then(() => router.reload());
            }}
          />
          <button
            className="flex gap-2 items-center h-full btn px-6 py-[7px] border-2 border-green-00BF6F text-white font-medium text-xs leading-tight rounded-r-[2px] hover:bg-green-00BF6F focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-green-00BF6F"
            type="button">
            <span className="flex gap-1 items-center">
              {plusIconBS('text-2xl')}
              <span
                className="text-base"
                onClick={(): Promise<boolean> =>
                  router.push('/collections/create')
                }>
                Tạo mới Collection
              </span>
            </span>
          </button>
        </div>
        {clickedSave && (
          <div className="flex gap-2 items-center h-full btn mr-5 px-6 py-1.5 border border-blue-1890FF text-white font-medium text-xs leading-tight rounded-sm hover:bg-blue-1890FF focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-blue-1890FF">
            {filePlay()}
            <button className="flex gap-2" type="button">
              <span className="text-base">Xem trước</span>
            </button>
          </div>
        )}
      </div>
      <div className="bg-white p-5">
        {/*Question in collection*/}
        {questionCollection?.map((q, i) => {
          return (
            <QuestionChoice
              key={`question-choice-base-${i}`}
              no={q.priority}
              removeQuestion={onRemoveHandler}
              questionData={q}
              isView={q.isView}
              markEdit={(): void => {
                setQuestionCollection(prevState => {
                  const newArray = Array.from(prevState);
                  newArray[i].isView = false;
                  return newArray;
                });
              }}
              setDescription={(text): void =>
                setQuestionCollection(prevState => {
                  const newArray = Array.from(prevState);
                  newArray[i].title = text;
                  return newArray;
                })
              }
              setTypeQuestion={text =>
                setQuestionCollection(prevState => {
                  const newArray = Array.from(prevState);
                  newArray[i].type = text;
                  return newArray;
                })
              }
              setAnswer={val =>
                setQuestionCollection(prevState => {
                  const newArray = Array.from(prevState);
                  newArray[i].answers = val;
                  return newArray;
                })
              }
            />
          );
        })}

        {/*Question create*/}
        {questionCreates?.map((v, i) => {
          return (
            <QuestionChoice
              key={`question-choice-create-${i}`}
              no={i + 1 + questionCollection?.length}
              setDescription={(text): void =>
                setQuestionCreates(prevState => {
                  const newArray = Array.from(prevState);
                  newArray[i].title = text;
                  return newArray;
                })
              }
              questionData={v}
              setTypeQuestion={(text): void =>
                setQuestionCreates(prevState => {
                  const newArray = Array.from(prevState);
                  newArray[i].type = text;
                  return newArray;
                })
              }
              setAnswer={(val): void =>
                setQuestionCreates(prevState => {
                  const newArray = Array.from(prevState);
                  newArray[i].answers = val;
                  return newArray;
                })
              }
              isView={v.isView}
            />
          );
        })}

        <div className="flex gap-3 place-content-end mt-9 mr-5 pb-9">
          <button
            className="flex gap-2 items-center h-full btn px-6 py-1 border border-green-00BF6F text-white font-medium text-xs leading-tight rounded-sm hover:bg-green-00BF6F focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-green-00BF6F"
            type="button">
            <span className="text-base" onClick={onSaveHandler}>
              Lưu
            </span>
          </button>
          <button
            className="flex gap-2 items-center h-full btn px-6 py-1 border border-white-D9D9D9 text-secondary-700 font-medium text-xs leading-tight rounded-sm hover:bg-white-D9D9D9 focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-white"
            type="button"
            onClick={(): Promise<boolean> => router.replace('/')}>
            <span className="text-base">Hủy</span>
          </button>
        </div>
      </div>
    </div>
  );
};

Question.getInitialProps = async ({query, res}): Promise<Props> => {
  const {searchStr, sortDirection, pageNo, pageSize, collectionId} = query;

  let collections = {} as CollectionList;

  try {
    collections = await collectionService.getCollection(
      searchStr?.toString() || '',
      (sortDirection as SortDirection) || SortDirection.DESC,
      parseInt(pageNo?.toString()) || 1,
      parseInt(pageSize?.toString()) || 99,
      CollectionStatus.DRAFT,
    );
  } catch (e) {
    if (res) {
      res.setHeader('Location', '/');
      res.statusCode = 302;
    } else {
      Router.push('/');
    }
  }

  let id = '';
  // get question in collection
  let questions: CollectionQuestionDTO[];
  try {
    id = (collectionId as string) || collections?.data[0]?.id;
    const collection = await collectionService.getCollectionById(id);
    questions = collection.questions;
  } catch (e) {
    if (res) {
      res.setHeader('Location', '/');
      res.statusCode = 302;
    } else {
      Router.push('/');
    }
  }

  return {
    collections,
    questions,
    collectionId: id,
  };
};

export default tailwindOnly(Question);
