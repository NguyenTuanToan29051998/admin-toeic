import {useRouter} from 'next/router';
import React, {FC, useState} from 'react';
import {tailwindOnly} from '../hocs/tailwindOnly';
import {eyeFillIcon, eyeSlashFillIcon} from '../public/static/icons';
import {everyone} from '../hocs/everyone';

const ResetPassword: FC = () => {
  const router = useRouter();

  const [showPass, setShowPass] = useState<boolean>(false);
  const [showPassConfirm, setShowPassConfirm] = useState<boolean>(false);
  const [createNewPassword, setCreateNewPassword] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="bg-white p-10 xs:p-0 mx-auto md:w-full md:max-w-xl rounded-[14px]">
        <div className="font-bold text-center text-[28px]">
          Tạo mật khẩu mới
        </div>
        {/*TODO USE form submit*/}
        {createNewPassword ? (
          <div className="w-full rounded-lg">
            <div className="px-5 py-7">
              <div className="mb-5">
                <label className="font-medium text-base text-black pb-1 block">
                  Nhập mã OTP
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="bg-gray-F7F7F7 rounded-lg px-3 py-4 mt-1 text-sm w-full tracking-widest focus:border focus:border-green-00BF6F outline-none"
                    placeholder="Nhập mã OTP"
                  />
                  <span className="absolute right-3 top-[17px] text-blue-2F80ED text-base font-normal hover:cursor-pointer">
                    Gửi lại mã
                  </span>
                </div>
              </div>
              <div className="mb-5">
                <div className="flex">
                  <label className="font-medium text-base text-black pb-1">
                    Mật khẩu
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={`${showPass ? 'text' : 'password'}`}
                    className="form-control focus:border focus:border-green-00BF6F outline-none bg-gray-F7F7F7 rounded-lg px-3 py-4 mt-1 text-sm w-full tracking-widest"
                  />
                  <div
                    className="absolute right-3 top-[15px]"
                    onClick={(): void => setShowPass(!showPass)}>
                    {showPass
                      ? eyeFillIcon('text-2xl')
                      : eyeSlashFillIcon('text-2xl')}
                  </div>
                </div>
              </div>
              <div className="mb-12">
                <div className="flex">
                  <label className="font-medium text-base text-black pb-1">
                    Nhập lại mật khẩu
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={`${showPassConfirm ? 'text' : 'password'}`}
                    className="form-control focus:border focus:border-green-00BF6F outline-none bg-gray-F7F7F7 rounded-lg px-3 py-4 mt-1 text-sm w-full tracking-widest"
                  />
                  <div
                    className="absolute right-3 top-[15px]"
                    onClick={(): void => setShowPassConfirm(!showPassConfirm)}>
                    {showPassConfirm
                      ? eyeFillIcon('text-2xl')
                      : eyeSlashFillIcon('text-2xl')}
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="flex mb-0 mx-auto transition duration-200 bg-gray-E5E6EC text-[#BDBDBD] px-24 py-4 rounded-[40px] text-base font-medium text-center">
                <span className="inline-block mr-2">Thay đổi mật khẩu</span>
              </button>
              <div className="mt-6 text-center text-base">
                Quay về màn
                <span
                  className="text-blue-1890FF text-base hover:cursor-pointer"
                  onClick={(): Promise<boolean> => router.push('/')}>
                  {' '}
                  Đăng nhập
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full rounded-lg">
            <div className="px-5 py-7">
              <div className="mb-5">
                <label className="font-medium text-base text-black pb-1 block">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  className="bg-gray-F7F7F7 rounded-lg px-3 py-4 mt-1 text-sm w-full tracking-widest focus:border focus:border-green-00BF6F outline-none"
                  placeholder="Nhập tên đăng nhập của bạn"
                />
              </div>
              <div className="flex gap-3 mt-6 items-center w-4/6 mx-auto">
                <hr className="w-[45%]" />
                <p className="w-[10%] text-center">Hoặc</p>
                <hr className="w-[45%]" />
              </div>
              <div className="mb-5">
                <label className="font-medium text-base text-black pb-1 block">
                  Email
                </label>
                <input
                  type="text"
                  className="bg-gray-F7F7F7 rounded-lg px-3 py-4 mt-1 text-sm w-full tracking-widest focus:border focus:border-green-00BF6F outline-none"
                  placeholder="Nhập email của bạn"
                />
              </div>
              <button
                type="button"
                className="flex mb-0 mx-auto transition duration-200 bg-gray-E5E6EC text-[#BDBDBD] px-24 py-4 rounded-[40px] text-base font-medium text-center"
                onClick={(): void => setCreateNewPassword(true)}>
                <span className="inline-block mr-2">Lấy Mã OTP</span>
              </button>
              <div className="mt-6 text-center text-base">
                Quay về màn
                <span
                  className="text-blue-1890FF text-base hover:cursor-pointer"
                  onClick={(): Promise<boolean> => router.push('/')}>
                  {' '}
                  Đăng nhập
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default everyone(ResetPassword);
