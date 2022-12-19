import axiosClient from './axios-client';

export const questionApiManagement = {
  getAll(isProfessor: boolean) {
    return axiosClient.get(`Adviser/GetAll?isProfessor=${isProfessor}`);
  },

  createQuestion(data: any) {
    return axiosClient.post('/graphql', data);
  },
};
