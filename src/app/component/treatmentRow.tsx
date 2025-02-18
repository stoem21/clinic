import { Button } from "flowbite-react";
import React, { FC, useEffect, useState } from "react";
import { Model, Survey } from "survey-react-ui";
import { treatmentRecordTypeForm } from "../surveyJson/create/treatmentRecord";
import {
  tooth,
  rootTreatment,
  xRay,
  ortho,
  other,
  scaling,
  rootPlan,
  filling,
  removableDentures,
  crown,
  implant,
  toothAndSideNorm,
  pediatrics,
  toothWithExtra,
} from "../surveyJson/treatmentType/tooth";
import "../row.css";
import { theme } from "../surveyJson/_theme";
import { mergeSurvey } from "../httpClient/service";

const mapQuestionType: { [key: string]: any } = {
  extraction: toothWithExtra(), // add choice ฟันเกิน(supernumeraryTooth)
  surgicalRemoval: toothWithExtra(), // add choice ฟันเกิน(supernumeraryTooth)
  scaling: scaling(),
  rootPlaning: rootPlan(),
  filling: filling(),
  rootCanalTreatment: rootTreatment(),
  removableDentures: removableDentures(),
  post: tooth(),
  crown: crown(),
  implant: implant(),
  ortho: ortho(),
  // bleaching
  // fluoride
  xRay: xRay(),
  // xRay: toothAndSideNorm(), // test
  pediatrics: pediatrics(),
  others: other(),
};

export interface RowData {
  id: string;
  treatmentRecordId: string;
  treatmentType: string;
  treatmentValue: any;
  updatedAt: string;
  createdAt: string;
}
export interface Props {
  // delete function
  // cls
  // initial value
  onClickDelete: () => void;
  initValue?: RowData;
  setValue: (type: string, rowData: any, id?: string) => void;
  canDelete: boolean;
}
export const TreatmentRow: FC<Props> = ({
  onClickDelete,
  initValue,
  setValue,
  canDelete,
}) => {
  const [typeSurvey, setTypeSurvey] = useState<Model | null>(new Model());
  const [rowSurvey, setRowSurvey] = useState<Model | null>(null);
  const [type, setType] = useState<string>("");
  const [isInit, setIsInit] = useState<boolean>(true);
  const onTypeChange = async (_: Model, options: any) => {
    setType(options.value);
  };
  const onValueChange = () => {
    setValue(type, rowSurvey?.getAllValues());
  };
  useEffect(() => {
    const modelTypeSurvey = new Model(treatmentRecordTypeForm());
    modelTypeSurvey.applyTheme(theme);
    if (initValue?.treatmentType && typeSurvey) {
      mergeSurvey(modelTypeSurvey, { type: initValue.treatmentType });
      setType(initValue.treatmentType);
    }
    setTypeSurvey(modelTypeSurvey);
  }, []);
  useEffect(() => {
    const modelRowSurvey = mapQuestionType[type]
      ? new Model(mapQuestionType[type])
      : null;
    modelRowSurvey?.applyTheme(theme);
    if (initValue?.treatmentValue && modelRowSurvey && isInit) {
      setIsInit(false);
      mergeSurvey(modelRowSurvey, initValue.treatmentValue);
    }
    setRowSurvey(modelRowSurvey);
  }, [type]);

  return (
    <div className="grid grid-cols-12 treatment-row">
      <div className="col-span-3">
        <Survey model={typeSurvey} onValueChanged={onTypeChange} />
      </div>
      {rowSurvey && (
        // hidden-thead
        <div className="col-span-8 no-survey-padding">
          <Survey model={rowSurvey} onValueChanged={onValueChange} />
        </div>
      )}
      <div className="flex items-end justify-end pb-6">
        {canDelete && (
          <Button
            color={"red"}
            onClick={async () => {
              // call delete function
              onClickDelete();
            }}
          >
            -
          </Button>
        )}
      </div>
    </div>
  );
};
