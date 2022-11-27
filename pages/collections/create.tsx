import React, {FC, useState} from 'react';
import {tailwindOnly} from '../../hocs/tailwindOnly';
import {plusIconBS} from '../../public/static/icons';
import {Field, Form, Formik} from 'formik';
import {CollectionCreateDTO} from '../../models/admin/Collection';
import {collectionService, imageService} from '../../services';
import toastr from 'toastr';
import {useRouter} from 'next/router';

const CreateCollection: FC = () => {
  const [fileImg, setFileImg] = useState<File>(null);
  const router = useRouter();

  const uploadImage = async (event): Promise<string> => {
    if (event.target.files && event.target.files[0]) {
      setFileImg(event.target.files[0]);
      // get link upload
      return await imageService.uploadImage(event.target.files[0]);
    }
    return '';
  };

  return (
    <div className="w-full">
      <div className="bg-white py-4">
        <h4 className="flex text-center text-white-0A1B39 font-medium text-xl mb-4">
          Quản lý Collection
        </h4>
        <span className="text-white-0A1B39 mt-4">
          Bạn có thể tạo mới các Collection của mình, để dễ quản lý câu hỏi, bài
          thi dễ dàng hơn
        </span>
      </div>
      <div className="bg-white">
        <Formik
          initialValues={
            {
              title: '',
              description: '',
              avatar: '',
            } as CollectionCreateDTO
          }
          onSubmit={async values => {
            try {
              await collectionService.createCollection(values);
            } catch (e) {
              toastr.error(e.Error);
            }
          }}>
          {({setFieldValue}) => {
            return (
              <Form className="max-w-3xl mx-auto mt-5 py-5">
                <div className="flex gap-4 items-center my-6">
                  <span className="flex justify-end w-32 md:w-40">
                    Tên Collection:
                  </span>
                  <Field
                    className="form-control relative flex-auto min-w-0 block px-3 py-1.5 text-sm md:text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-2 rounded-sm"
                    placeholder="Nhập tên Collection của bạn"
                    aria-label="Name collection"
                    aria-describedby="button-addon3"
                    name="title"
                    type="text"
                  />
                </div>
                <div className="flex gap-4 items-center my-6">
                  <span className="flex justify-end w-32 md:w-40">
                    Ảnh Collection:
                  </span>
                  {/* <div className="p-10 border border-dashed border-blue-1890FF rounded-sm text-center hover:cursor-pointer">
              <input
                type="file"
                multiple
                className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
              />
              {plusIconBS('text-2xl')}
              <div className="text-gray-00000040">Upload</div>
            </div> */}
                  <label className=" justify-center cursor-pointer">
                    <div className="p-10 border border-dashed border-blue-1890FF rounded-sm text-center hover:cursor-pointer">
                      {plusIconBS('text-2xl mx-auto my-0')}
                      <div className="text-gray-00000040">Upload</div>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={async e => {
                        setFieldValue('avatar', await uploadImage(e));
                      }}
                    />
                  </label>
                  <div className="avatar">
                    <img
                      src={fileImg ? URL.createObjectURL(fileImg) : 'none'}
                      className="w-full h-full"
                    />
                  </div>
                </div>
                <div className="flex gap-4 items-center my-6">
                  <div>
                    <span className="flex justify-end w-32 md:w-40">
                      Collection mô tả:
                    </span>
                  </div>
                  <Field
                    className="resize rounded-sm border-2 outline-none w-4/5 h-20 px-3 py-1 text-sm md:text-base"
                    name="description"
                    component="textarea"
                    placeholder="Nhập mô tả cho Collection của bạn"
                  />
                </div>
                {/*<div className="flex gap-4 items-center mt-6 mb-8">*/}
                {/*  <span className="flex justify-end w-40">Trạng thái:</span>*/}
                {/*  {Object.keys(CollectionStatus)*/}
                {/*    .map(key => CollectionStatus[key])*/}
                {/*    .map((v, i) => {*/}
                {/*      return (*/}
                {/*        <div*/}
                {/*          className="flex items-center"*/}
                {/*          key={`radio-status-${i}`}>*/}
                {/*          <Field*/}
                {/*            type="radio"*/}
                {/*            name="status"*/}
                {/*            value={v}*/}
                {/*            className="h-4 w-4 border-gray-300 focus:ring-green-00BF6F"*/}
                {/*          />*/}
                {/*          <label className="text-sm font-medium text-gray-900 ml-2 block">*/}
                {/*            {v.charAt(0).toUpperCase() + v.slice(1)}*/}
                {/*          </label>*/}
                {/*        </div>*/}
                {/*      );*/}
                {/*    })}*/}
                {/*</div>*/}
                <div className="flex gap-4 items-center mt-14">
                  <div className="flex justify-end w-32 md:w-40" />
                  <div className="flex gap-2">
                    <button
                      className="flex gap-2 items-center h-full btn px-2 md:px-6 py-1.5 border-2 border-green-00BF6F text-white font-medium text-xs leading-tight rounded-r-[2px] hover:bg-green-00BF6F focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-green-00BF6F rounded-sm"
                      type="submit">
                      <span
                        className="text-base"
                        onClick={(): Promise<boolean> =>
                          router.push('/collections')
                        }>
                        Tạo Collection
                      </span>
                    </button>
                    <button
                      className="flex gap-2 items-center h-full btn px-6 py-1.5 border-2 hover:border-red-FF4D4F hover:text-red-FF4D4F font-medium text-xs leading-tight focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-white rounded-sm"
                      type="button"
                      id="button-addon3">
                      <span className="text-base">Hủy</span>
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default tailwindOnly(CreateCollection);
