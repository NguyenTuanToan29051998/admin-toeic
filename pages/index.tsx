import {useRouter} from 'next/router';
import React, {FC, useState} from 'react';
import {
  eyeFillIcon,
  eyeSlashFillIcon,
  facebookIcon,
  googleIcon,
} from '../public/static/icons';
import {everyone} from '../hocs/everyone';
import {useDispatch} from 'react-redux';
import {login} from '../redux/slices/loginUserSlice';
import toastr from 'toastr';

const Login: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showPass, setShowPass] = useState<boolean>(false);

  const [user, setUser] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  const onSubmit = async (e): Promise<void> => {
    e.preventDefault();
    try {
      await dispatch(login({email: user, password: pass}));
      await router.push('/collections');
    } catch (e) {
      toastr.error(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12 px-4">
      <div className="w-full bg-white p-10 xs:p-0 mx-auto md:w-full md:max-w-xl rounded-[14px]">
        <div className="font-medium text-center text-lg mb-5 border-b pb-4">
          Đăng nhập
        </div>
        <form className="w-full rounded-lg" onSubmit={onSubmit}>
          <div className="px-5 py-7">
            <label className="font-medium text-base text-black pb-1 block">
              Tên đăng nhập
            </label>
            <input
              value={user}
              onChange={e => {
                setUser(e.target.value);
              }}
              type="text"
              className="bg-gray-F7F7F7 rounded-lg px-3 py-4 mt-1 mb-5 text-sm w-full tracking-widest focus:border focus:border-green-00BF6F outline-none"
            />
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
                value={pass}
                onChange={e => {
                  setPass(e.target.value);
                }}
                type={`${showPass ? 'text' : 'password'}`}
                className="form-control focus:border focus:border-green-00BF6F outline-none bg-gray-F7F7F7 rounded-lg px-3 py-4 mt-1 mb-5 text-sm w-full tracking-widest"
              />
              <div
                className="absolute right-3 top-[22px]"
                onClick={(): void => setShowPass(!showPass)}>
                {showPass
                  ? eyeFillIcon('text-2xl')
                  : eyeSlashFillIcon('text-2xl')}
              </div>
            </div>
            <button
              type="submit"
              className="transition duration-200 bg-green-00BF6F focus:shadow-sm text-white w-full py-4 rounded-[40px] text-base shadow-sm hover:shadow-md font-medium text-center inline-block">
              <span className="inline-block mr-2">Đăng nhập</span>
            </button>
          </div>
          <p className="font-normal text-base text-center">
            hoặc đăng nhập bằng
          </p>
          <div className="flex px-5 gap-5 mt-4 flex-wrap">
            <div className="flex flex-auto gap-3 py-3 px-14 border rounded-3xl justify-center bg-gray-E5E6EC">
              {facebookIcon}
              <p className="text-base">Facebook</p>
            </div>
            <div className="flex flex-auto gap-3 py-3 px-14 border rounded-3xl justify-center bg-gray-E5E6EC">
              {googleIcon}
              <p className="text-base">Google</p>
            </div>
          </div>
          <div></div>
          <div className="text-center mt-12">
            <span>Bạn chưa có tài khoản? </span>
            <span
              className="text-blue-2F80ED hover:cursor-pointer"
              onClick={(): Promise<boolean> => router.push('/register')}>
              Đăng ký ngay!
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default everyone(Login);
