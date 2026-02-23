"use client";
import CommonRadioButton from "@/components/common/CommonRadioButton";
import { HTMLAttributes, JSX, memo } from "react";

/**
 * ListItem 특성상 많은 수가 렌더링되고 contextAPI가 부모에서 참조되므로 스토어 상태 수정시
 * 부모는 무조건 렌더링되고 자식도 그에따라 렌더링되므로 쓸모없는 재렌더링을 방지하기위해 memo로 렌더링
 * 캐싱이 필요없다면 AdminRowListItem를 사용할 것
 */
type Props<T extends { id: number }> = {
  className?: string;
  item: T;
  keys: string[];
  rowIndex: number;
  isSelect: boolean;
  setSelectRow: (rowIndex: number) => void;
} & HTMLAttributes<HTMLDivElement>;

export const AdminRowListItem = <T extends { id: number }>({
  className,
  item,
  keys,
  rowIndex,
  isSelect,
  setSelectRow,
}: Readonly<Props<T>>) => {
  console.log(item, "AdminRowListItem item");

  return (
    <label
      className={`relative flex w-full flex-row items-center gap-2 pl-2 text-xs ${
        isSelect ? "bg-[#F8F8FE]" : ""
      } ${className || ""}`}
      onClick={() => setSelectRow(item.id)}
    >
      <CommonRadioButton name="row" isSelected={isSelect} />
      <p className="w-12 overflow-hidden text-ellipsis text-center">
        {rowIndex}
      </p>
      {/* 실제로는 pk값을 사용해야됨 */}
      {keys.map((key: string, index: number) => (
        <p
          key={index}
          className="flex h-[30px] flex-1 items-center truncate px-2"
        >
          {item[key as keyof T] !== undefined
            ? String(item[key as keyof T])
            : ""}
        </p>
      ))}
    </label>
  );
};

const MemoizedAdminRowListItem = memo(AdminRowListItem) as <
  T extends { id: number }
>(
  props: Props<T>
) => JSX.Element;

export default MemoizedAdminRowListItem;
