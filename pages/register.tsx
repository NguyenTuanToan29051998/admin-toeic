import {useRouter} from 'next/router';
import React, {FC, useState} from 'react';
import {tailwindOnly} from '../hocs/tailwindOnly';
import {
  appleIcon,
  eyeFillIcon,
  eyeSlashFillIcon,
  facebookBlueIcon,
  googleCharcoalIcon,
  LeafIcon,
  plusIcon,
} from '../public/static/icons';
import {everyone} from '../hocs/everyone';

const RegisterAccount: FC = () => {
  const router = useRouter();

  const [showPass, setShowPass] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="bg-white p-10 xs:p-0 mx-auto md:w-full md:max-w-xl rounded-[14px]">
        <div className="font-bold text-center text-[28px]">
          Đăng ký tài khoản mới miễn phí
        </div>
        {/*TODO USE form submit*/}
        <div className="w-full rounded-lg">
          <div className="px-5 py-7">
            <div className="mb-5">
              <label className="font-medium text-base text-black pb-1 block">
                Họ và tên
              </label>
              <input
                type="text"
                className="bg-gray-F7F7F7 rounded-lg px-3 py-4 mt-1 text-sm w-full tracking-widest focus:border focus:border-green-00BF6F outline-none"
                placeholder="Nhập họ và tên của bạn"
              />
            </div>
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
            <div className="mb-5">
              <div className="flex">
                <label className="flex flex-auto font-medium text-base text-black pb-1">
                  Mật khẩu
                </label>
                <span
                  className="text-blue-2F80ED text-base font-normal hover:cursor-pointer"
                  onClick={(): Promise<boolean> =>
                    router.push('/reset-password')
                  }>
                  Quên mật khẩu?
                </span>
              </div>
              <div className="relative">
                <input
                  type={`${showPass ? 'text' : 'password'}`}
                  className="form-control outline-none bg-gray-F7F7F7 rounded-lg px-3 py-4 mt-1 text-sm w-full tracking-widest focus:border focus:border-green-00BF6F"
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
            <div>
              <label className="font-medium text-base text-black pb-1 block">
                Email
              </label>
              <input
                type="text"
                className="bg-gray-F7F7F7 rounded-lg px-3 py-4 mt-1 mb-5 text-sm w-full tracking-widest focus:border focus:border-green-00BF6F outline-none"
                placeholder="Nhập email của bạn"
              />
            </div>
            <div className="flex gap-2">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="bg-gray-50 border-gray-300 h-5 w-5 rounded accent-green-00BF6F"
                // checked
                // onClick={(): void => setClickedNotes(!clickedNotes)}
              />
              <div>
                <span>
                  Tôi đồng ý với các{' '}
                  <span className="text-blue-1890FF">
                    điều kiện và điều khoản
                  </span>
                </span>
              </div>
            </div>
            <button
              type="button"
              className="flex mt-12 mb-0 mx-auto transition duration-200 bg-gray-E5E6EC text-[#BDBDBD] px-24 py-4 rounded-[40px] text-base font-medium text-center">
              <span className="inline-block mr-2">Đăng ký</span>
            </button>
            <div className="flex gap-3 mt-6 items-center w-4/6 mx-auto">
              <hr className="w-[45%]" />
              <p className="w-[10%] text-center">Hoặc</p>
              <hr className="w-[45%]" />
            </div>
            <div className="flex gap-3 justify-center mt-6">
              <div className="grid items-center justify-center w-11 h-11 rounded-full border">
                {facebookBlueIcon}
              </div>
              <div className="grid items-center justify-center w-11 h-11 rounded-full border">
                <div className="flex gap-1 items-center">
                  {googleCharcoalIcon}
                  {plusIcon}
                </div>
              </div>
              <div className="grid items-center w-11 h-11 rounded-full border">
                <div className="grid justify-items-center">
                  {LeafIcon}
                  {appleIcon}
                </div>
              </div>
            </div>
            <div className="mt-6 text-center text-base">
              Bạn đã có tài khoản rồi?
              <span
                className="text-blue-1890FF text-base hover:cursor-pointer"
                onClick={(): Promise<boolean> => router.push('/')}>
                {' '}
                Đăng nhập
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default everyone(RegisterAccount);
