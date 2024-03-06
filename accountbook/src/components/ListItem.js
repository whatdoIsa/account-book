import React, { useEffect, useState } from "react";
import "./ListItem.scss";
import {
  BiSolidMessageSquareEdit,
  BiSolidMessageSquareX,
  BiSolidMessageSquareCheck,
  BiSolidMessageSquareMinus,
} from "react-icons/bi";

const enteredOnlyNumber = (val) => {
  return val.replace(/[^0-9]/g, "");
};

const ListItem = ({ acc, onRemove, onUpdate }) => {
  const addComma = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const { id, date, divi, list, pay } = acc;

  const [dateChange, setDateChange] = useState("");
  const [diviChange, setDiviChange] = useState("");
  const [listChange, setListChange] = useState("");
  const [payChange, setPayChange] = useState("");

  useEffect(() => {
    setDateChange(acc.date);
    setDiviChange(acc.divi);
    setListChange(acc.list);
    setPayChange(acc.pay);
  }, [acc]);

  const onChangeDate = (e) => {
    e.preventDefault();

    setDateChange(e.target.value);
  };

  const onChangeDivi = (e) => {
    e.preventDefault();

    setDiviChange(e.target.value);
  };

  const onChangeList = (e) => {
    e.preventDefault();

    setListChange(e.target.value);
  };

  const onChangePay = (e) => {
    e.preventDefault();

    let isNotNumber = /^[^1-9][^0-9]{0,11}$/g.test(e.target.value)
      ? true
      : false;
    if (isNotNumber) return;

    let amount = enteredOnlyNumber(e.target.value);
    setPayChange(amount);
  };

  const [isUpdate, setIsUpdate] = useState(false);
  const toggleIsUpdate = () => setIsUpdate(!isUpdate);

  const handleQuitUpdate = () => {
    setIsUpdate(false); // isEdit을 false로 하여 폼을 없애고
  };

  const handleUpdate = (e) => {
    if (dateChange === "") {
      window.alert("날짜를 입력하거나 선택해주세요.");

      return;
    }
    if (listChange === "") {
      window.alert("지출내용을 입력해주세요.");

      return;
    }
    if (payChange === "") {
      window.alert("지출금액을 입력해주세요.");

      return;
    }

    onUpdate(id, dateChange, diviChange, listChange, payChange);
    toggleIsUpdate(); // 수정하고 나면 수정폼은 닫아줌
  };

  // 삭제 전 확인
  // const confirmRemove = (id) => {
  //   if (window.confirm("삭제하시겠습니까?")) {
  //     onRemove(id);
  //     alert("삭제완료");
  //   } else {
  //     alert("취소");
  //   }
  // };

  return (
    <div className={divi === "지출" ? "ListItemRed" : "ListItemBlue"}>
      <div className="ListItemContent">
        {isUpdate ? (
          <div className="ListItemContentLeft">
            <div className="ListItemDivi">
              <select
                id="divi"
                defaultValue={divi === "수입" ? "수입" : "지출"}
                onChange={onChangeDivi}
              >
                <option value="수입">수입</option>
                <option value="지출">지출</option>
              </select>
            </div>
            <div className="ListItemDate">
              <input type="date" value={dateChange} onChange={onChangeDate} />
            </div>
            <div className="ListItemList">
              <input type="text" value={listChange} onChange={onChangeList} />
            </div>
            <div className="ListItemPay">
              <input type="text" value={payChange} onChange={onChangePay} />
            </div>
          </div>
        ) : (
          <div className="ListItemContentLeft">
            <div className={divi === "지출" ? "DiviRed" : "DiviBlue"}>
              {divi}
            </div>
            <div className="ListItemDate">{date}</div>
            <div className="ListItemList">{list}</div>
            <div className="ListItemPay">{addComma(pay.toString())}원</div>
          </div>
        )}
        {
          // 수정중인 상태면 ? 수정완료,취소버튼 보이게. 수정중인 상태가 아니면 : 수정, 삭제 버튼 보이게
          isUpdate ? (
            <>
              <div className="ListItemEdit">
                <BiSolidMessageSquareCheck
                  onClick={() =>
                    handleUpdate(
                      id,
                      dateChange,
                      diviChange,
                      listChange,
                      payChange
                    )
                  }
                />
              </div>
              <div className="ListItemDelete">
                <BiSolidMessageSquareX onClick={handleQuitUpdate} />
              </div>
            </>
          ) : (
            <>
              <div className="ListItemEdit">
                <BiSolidMessageSquareEdit onClick={toggleIsUpdate} />
              </div>
              <div className="ListItemDelete">
                <BiSolidMessageSquareMinus onClick={() => onRemove(id)} />
                {/* 삭제 확인 */}
                {/* <BiSolidMessageSquareMinus onClick={confirmRemove(id)} /> */}
              </div>
            </>
          )
        }
      </div>
    </div>
  );
};

export default ListItem;
