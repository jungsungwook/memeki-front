import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { TokenToRedux } from './util/util';
import Main from './component/main/index';
import Pending from './component/main/pending/Pending';
import Search from './component/search/index';
import MyPage from './component/userPage/myPage/MyPage';
import Detail from './component/detail/Detail';
import PartEdit from './component/publish/partEdit/PartEdit';
import SignUp from './component/userPage/signUp/SignUp';
import Login from './component/userPage/login/Login';
import Publish from './component/publish';
import MemeDoc from './component/main/memeDoc/MemeDoc';
import FindId from './component/userPage/login/FindId';
import FindPw from './component/userPage/login/FindPw';
import Final from './component/userPage/signUp/Final';
import MoreYellowBox from './component/search/moreYellowBox/MoreYellowBox';
import MoreGrayBox from './component/search/moreGrayBox/MoreGrayBox';
import Success from './component/userPage/signUp/Success';

function App() {
  // RefreshTokenUtil();
  TokenToRedux();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/memeDoc" element={<MemeDoc />} />
        <Route path="/pending" element={<Pending />} />
        {/* 쿼리 파라미터 */}
        <Route path="/search" element={<Search />} />
        <Route path="/search/more" element={<MoreYellowBox />} />
        <Route path="/search/morePending" element={<MoreGrayBox />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/detail/:pageId" element={<Detail />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/detail/:pageId/:pageTextId" element={<PartEdit />} />
        <Route path="/login/signUp" element={<SignUp />} />
        <Route path="login/signUp/final" element={<Final />} />
        <Route path="login/signUp/success" element={<Success />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/id" element={<FindId />} />
        <Route path="/login/pw" element={<FindPw />} />
      </Routes>
    </div>
  );
}

export default App;
