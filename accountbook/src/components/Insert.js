import React, { useState, useCallback } from "react";
import "./Insert.scss";
import { IoMdAddCircle } from "react-icons/io";

const enteredOnlyNumber = (val) => {
  return val.replace(/[^0-9]/g, "");
};

const Insert = ({ onInsert }) => {
  const [date, setDate] = useState("");
  const [divi, setDivi] = useState("");
  const [list, setList] = useState("");
  const [pay, setPay] = useState("");

  const checkNull = () => {
    const dateCheck = document.getElementById("date");
    const diviCheck = document.getElementById("divi");
    const listCheck = document.getElementById("list");
    const payCheck = document.getElementById("pay");

    if (dateCheck.value === "") {
      setDivi(diviCheck.value);
      setList(listCheck.value);
      setPay(payCheck.value);

      window.alert("날짜를 입력하거나 선택해주세요.");
      dateCheck.focus();

      return;
    }

    if (diviCheck.value === "") {
      window.alert("구분을 선택하세요.");
      diviCheck.focus();
      return;
    }

    if (listCheck.value === "") {
      window.alert("내용을 입력하세요.");
      listCheck.focus();
      return;
    }

    if (payCheck.value === "") {
      window.alert("금액을 입력하세요.");
      payCheck.focus();
      return;
    }
  };

  const changeDate = (event) => {
    setDate(event.target.value);
  };

  const changeDivi = (event) => {
    setDivi(event.target.value);
  };

  const changeList = (event) => {
    setList(event.target.value);
  };

  const changePay = (event) => {
    let isNotNumber = /^[^1-9][^0-9]{0,11}$/g.test(event.target.value)
      ? true
      : false;
    if (isNotNumber) return;

    let amount = enteredOnlyNumber(event.target.value);
    setPay(amount);
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setDate("");
      setDivi("");
      setList("");
      setPay("");
      onInsert(date, divi, list, pay);
    },
    [onInsert, date, divi, list, pay]
  );

  const [showLayer, setShowLayer] = useState(false);
  const toggleLayer = () => {
    setShowLayer(!showLayer);
  };

  return (
    <form onSubmit={onSubmit}>
      {showLayer && (
        <div className="InsertTemplate">
          <div className="InsertTop">
            <div className="InsertTitle">날짜:</div>
            <div className="InsertForm">
              <input
                type="date"
                placeholder="지출일자를 입력해주세요."
                id="date"
                value={date}
                onChange={changeDate}
              />
            </div>
          </div>
          <div className="InsertTop">
            <div className="InsertTitle">구분:</div>
            <div className="InsertForm">
              <select id="divi" onChange={changeDivi}>
                <option value=""></option>
                <option value="수입">수입</option>
                <option value="지출">지출</option>
              </select>
            </div>
          </div>
          <div className="InsertTop">
            <div className="InsertTitle">내용:</div>
            <div className="InsertForm">
              <input
                placeholder="지출내용을 입력해주세요."
                id="list"
                value={list}
                onChange={changeList}
              />
            </div>
          </div>
          <div className="InsertTop">
            <div className="InsertTitle">금액:</div>
            <div className="InsertForm">
              <input
                placeholder="금액을 입력해주세요."
                id="pay"
                value={pay}
                onChange={changePay}
              />
            </div>
          </div>
          <div className="InsertBottom">
            <button type="submit" onClick={checkNull}>
              입력
            </button>
            <button type="button" onClick={toggleLayer}>
              닫기
            </button>
          </div>
        </div>
      )}
      <div className="InsertButton">
        <IoMdAddCircle onClick={toggleLayer} />
      </div>
    </form>
  );
};

export default Insert;
