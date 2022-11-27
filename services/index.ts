import axios from 'axios';
import getConfig from 'next/config';
import {AuthGateway} from '../gateways/AuthGateway';
import {AuthService} from './AuthService';
import {CollectionGateway} from '../gateways/CollectionGateway';
import {ExamAttemptDetailGateway} from '../gateways/ExamAttemptDetailGateway';
import {ExamAttemptGateway} from '../gateways/ExamAttemptGateway';
import {ExamExecutionGateway} from '../gateways/ExamExecutionGateway';
import {QuestionsGateway} from '../gateways/QuestionsGateway';
import {CollectionService} from './CollectionService';
import {ExamAttemptDetailService} from './ExamAttemptDetailService';
import {ExamAttemptService} from './ExamAttemptService';
import {ExamExecutionService} from './ExamExecutionService';
import {QuestionsService} from './QuestionsService';
import {ImageGateway} from '../gateways/ImageGateway';
import {ImageService} from './ImageService';
import {ExamService} from './ExamService';
import {ExamGateway} from '../gateways/ExamGateway';
import {TagGateway} from '../gateways/TagGateWay';
import {TagService} from './TagService';

const restConnector = axios.create({
  baseURL: getConfig().publicRuntimeConfig.BASE_API_URL,
});

const authGateway = new AuthGateway({restConnector});
const collectionGateway = new CollectionGateway({restConnector});
const examAttemptDetailGateway = new ExamAttemptDetailGateway({restConnector});
const examAttemptGateway = new ExamAttemptGateway({restConnector});
const examExecutionGateway = new ExamExecutionGateway({restConnector});
const questionsGateway = new QuestionsGateway({restConnector});
const examGateway = new ExamGateway({restConnector});
const imageGateway = new ImageGateway({restConnector});
const tagGateway = new TagGateway({restConnector});
// const systemGateway = new SystemGateway({restConnector});

export const authService = new AuthService({authGateway});
export const collectionService = new CollectionService({collectionGateway});
export const examAttemptDetailService = new ExamAttemptDetailService({
  examAttemptDetailGateway,
});
export const examAttemptService = new ExamAttemptService({examAttemptGateway});
export const examExecutionService = new ExamExecutionService({
  examExecutionGateway,
});
export const questionsService = new QuestionsService({questionsGateway});
export const examService = new ExamService({examGateway});
export const imageService = new ImageService({imageGateway});
export const tagService = new TagService({tagGateway});
// export const systemService = new SystemService({systemGateway});
