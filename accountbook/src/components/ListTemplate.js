import ListItem from "./ListItem";
import "./ListTemplate.scss";

const ListTemplate = ({ accData, onRemove, onUpdate }) => {
  return (
    <div className="ListTemplate">
      <div className="ListTitle">최근 수입/지출 현황</div>
      {accData
        .slice(0)
        .reverse()
        .map((accList) => (
          <ListItem
            acc={accList}
            key={accList.id}
            onRemove={onRemove}
            onUpdate={onUpdate}
          />
        ))}
    </div>
  );
};

export default ListTemplate;
