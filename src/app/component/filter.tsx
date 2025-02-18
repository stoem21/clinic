import { Button, Card } from "flowbite-react";
import React, { FC, useEffect, useState } from "react";
import { Model, Survey } from "survey-react-ui";
import { ChoicesRestful, settings } from "survey-core";
import { isEqual } from "lodash";
import useAuthStore from "../store/authStore";
import { mergeSurvey } from "../httpClient/service";
import { theme } from "../surveyJson/_theme";

const initSurveyAuth = async (token: string): Promise<void> => {
  ChoicesRestful.clearCache();
  ChoicesRestful.onBeforeSendRequest = (_, options) => {
    options.request.setRequestHeader("Authorization", "Bearer " + token);
  };
  settings.web.cacheLoadedChoices = false;
};

export interface Props {
  filterForm: any;
  onClickSearch: (searchVal?: { [key: string]: string }) => void;
  onClickClear?: (filterSurvey: Model) => void;
  receivedData?: object; // pasing object that match with survey answer
  isSetValue?: boolean; // if true will set value by using recevedData
  validateFunction?: { [key: string]: (comingVal: any, oldVal?: any) => any };
}
export const Filter: FC<Props> = ({
  filterForm,
  onClickSearch,
  onClickClear,
  receivedData,
  isSetValue,
  validateFunction,
}) => {
  const { userData } = useAuthStore();
  const [filterSurvey, setFilterSurvey] = useState<Model>(new Model());
  const clear = () => {
    if (onClickClear) {
      onClickClear(filterSurvey);
    } else {
      filterSurvey.clear();
      return onClickSearch();
    }
  };
  useEffect(() => {
    if (
      isSetValue &&
      receivedData &&
      filterSurvey &&
      Object.keys(filterSurvey.toJSON()).length !== 0
    ) {
      if (Object.keys(receivedData).length === 0) {
        filterSurvey.clear();
      } else {
        mergeSurvey(filterSurvey, receivedData);
      }
    }
  }, [filterSurvey, receivedData, isSetValue]);

  useEffect(() => {
    initSurveyAuth(userData?.token ?? "")
      .then(() => {
        const filterModel = new Model(filterForm);
        filterModel.applyTheme(theme);
        filterModel.onAfterRenderQuestion.add((_, options) => {
          if (options.question.name === "emptyField") {
            options.htmlElement.style.opacity = "0";
          }
        });
        setFilterSurvey(filterModel);
      })
      .finally(() => {});
  }, []);

  const onValueChange = async (sender: Model, options: any) => {
    if (
      validateFunction &&
      Object.keys(validateFunction).includes(options.name)
    ) {
      const val = validateFunction[options.name](
        options.value,
        options.oldValue
      );
      if (!isEqual(val, options.value)) {
        options.value = val;
        sender.setValue(options.name, options.value);
      }
    }
  };
  return (
    <Card
      className="flex"
      theme={{
        root: { children: "flex h-full flex-col justify-center p-6" },
      }}
    >
      {/* <div>ค้นหา</div> */}
      <Survey model={filterSurvey} onValueChanging={onValueChange} />
      <div className="flex justify-end mt-4">
        <Button onClick={() => clear()}>ล้างการค้นหา</Button>
        <Button
          className="ml-3"
          onClick={() => onClickSearch(filterSurvey.getAllValues())}
        >
          ค้นหา
        </Button>
      </div>
    </Card>
  );
};
