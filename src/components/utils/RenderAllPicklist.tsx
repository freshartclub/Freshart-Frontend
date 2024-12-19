import { useEffect, useState } from "react";
import { useGetPickListMutation } from "./http/useGetPickListMutation";

export const RenderAllPicklists = (fields: string[]) => {
  const [picklist, setPicklist] = useState([]);
  const { data } = useGetPickListMutation();

  useEffect(() => {
    if (!fields || fields.length === 0) {
      setPicklist([]);
      return;
    }

    const groupedPicklist =
      data && data.length > 0
        ? fields.map((field) => {
            const matchedField = data.find(
              (item: any) => item?.picklistName === field
            );
            return {
              fieldName: field,
              picklist: matchedField?.picklist
                ? matchedField.picklist.map((picklistItem: any) => ({
                    label: picklistItem.name,
                    value: picklistItem.name,
                  }))
                : [],
            };
          })
        : [];

    setPicklist(groupedPicklist);
  }, [data]);

  return picklist;
};

export const RenderAllSinglePicklist = (fields: string[]) => {
  const [picklist, setPicklist] = useState([]);
  const { data } = useGetPickListMutation();

  useEffect(() => {
    if (!fields || fields.length === 0) {
      setPicklist([]);
      return;
    }

    const groupedPicklist =
      data && data.length > 0
        ? fields.map((field) => {
            const matchedField = data.find(
              (item: any) => item?.picklistName === field
            );
            return {
              fieldName: field,
              picklist: matchedField?.picklist,
            };
          })
        : [];

    setPicklist(groupedPicklist);
  }, [data]);

  return picklist;
};

export const RenderAllPicklist = (field: string) => {
  const [picklst, setPicklist] = useState([]);
  const { data } = useGetPickListMutation();

  useEffect(() => {
    const list =
      data && data.length > 0
        ? data.filter((item: any) => item?.picklistName === field)
        : [];

    if (list?.length > 0 && list[0]?.picklist?.length > 0) {
      setPicklist(
        list[0]?.picklist.map((item: any) => ({
          label: item.name,
          value: item.name,
        }))
      );
    }
  }, [data]);

  return picklst;
};
