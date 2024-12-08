import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Col, Form, Input, InputNumber, Row, Spin } from "antd/lib";
import { Select } from "antd";
// import FileUploadToStrapi from "../upload";
import TextArea from "antd/lib/input/TextArea";
export const Field = ({ field, columnSize, }) => {
    if (!field.type)
        field.type = "input";
    const getElement = () => {
        switch (field.type) {
            case "input":
                return _jsx(Input, {});
            case "selectTag":
                return (_jsx(Select, { className: "w-full", mode: "tags", placeholder: "Please select", defaultValue: [], style: { width: "100%" }, options: field.options }));
            case "select":
                return _jsx(Select, { options: field.options, className: "w-full" });
            case "number":
                return _jsx(InputNumber, { className: "w-full" });
            case "password":
                return _jsx(Input.Password, {});
            case "textarea":
                return _jsx(TextArea, {});
            // case "file":
            //   return <FileUploadToStrapi />;
        }
    };
    let formItemProps = {};
    switch (field.type) {
        case "file":
            formItemProps = {
                valuePropName: "fileList",
                getValueFromEvent: (e) => e,
            };
            break;
        case "checkbox":
            formItemProps = { valuePropName: "checked" };
            break;
    }
    return (_jsx(Col, { span: field.span ?? 24 / (columnSize ?? 2), children: _jsx(Form.Item, { name: field.name, label: field.label, rules: field.rules, ...formItemProps, children: getElement() }) }));
};
export const AutoForm = ({ fields, columnSize, form, onFinish, loading, }) => {
    return (_jsxs(Form, { form: form, layout: "vertical", onFinish: onFinish, children: [loading && _jsx(Spin, {}), _jsx(Row, { gutter: [16, 0], children: fields.map((field, index) => (_jsx(Field, { field: field, columnSize: columnSize }, index))) })] }));
};
