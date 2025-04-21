import { AnySchema, ObjectSchema, TypeOf } from 'yup';
import { PagerForm as PagerFormDto } from 'src/schema/generated';
type FormDataType = TypeOf<ObjectSchema<Record<string, AnySchema>>>;
export type PagerFormBuilderProps = {
    readonly formDto: PagerFormDto;
    readonly onSubmit: (data: FormDataType) => void;
    readonly submitting?: boolean;
    readonly loading?: boolean;
};
export declare function PagerFormBuilder({ formDto, onSubmit, submitting, loading, }: PagerFormBuilderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=PagerFormBuilder.d.ts.map