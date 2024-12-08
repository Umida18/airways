import React from "react";
import { type FormInstance, type SelectProps } from "antd";
import { Rule } from "antd/es/form";
export type FieldType = {
    label: string | React.ReactNode;
    name: string;
    type?: "input" | "select" | "selectTag" | "checkbox" | "number" | "password" | "file" | "textarea";
    options?: SelectProps["options"];
    span?: number;
    rules?: Rule[];
};
export declare const Field: ({ field, columnSize, }: {
    field: FieldType;
    columnSize?: number;
}) => import("react/jsx-runtime").JSX.Element;
export declare const AutoForm: ({ fields, columnSize, form, onFinish, loading, }: {
    fields: FieldType[];
    columnSize?: number;
    form: FormInstance<any>;
    onFinish: (values: Record<string, any>) => void;
    loading: boolean;
}) => import("react/jsx-runtime").JSX.Element;
