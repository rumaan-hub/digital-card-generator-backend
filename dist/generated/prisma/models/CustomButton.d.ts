import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CustomButtonModel = runtime.Types.Result.DefaultSelection<Prisma.$CustomButtonPayload>;
export type AggregateCustomButton = {
    _count: CustomButtonCountAggregateOutputType | null;
    _min: CustomButtonMinAggregateOutputType | null;
    _max: CustomButtonMaxAggregateOutputType | null;
};
export type CustomButtonMinAggregateOutputType = {
    id: string | null;
    cardId: string | null;
    label: string | null;
    url: string | null;
};
export type CustomButtonMaxAggregateOutputType = {
    id: string | null;
    cardId: string | null;
    label: string | null;
    url: string | null;
};
export type CustomButtonCountAggregateOutputType = {
    id: number;
    cardId: number;
    label: number;
    url: number;
    _all: number;
};
export type CustomButtonMinAggregateInputType = {
    id?: true;
    cardId?: true;
    label?: true;
    url?: true;
};
export type CustomButtonMaxAggregateInputType = {
    id?: true;
    cardId?: true;
    label?: true;
    url?: true;
};
export type CustomButtonCountAggregateInputType = {
    id?: true;
    cardId?: true;
    label?: true;
    url?: true;
    _all?: true;
};
export type CustomButtonAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CustomButtonWhereInput;
    orderBy?: Prisma.CustomButtonOrderByWithRelationInput | Prisma.CustomButtonOrderByWithRelationInput[];
    cursor?: Prisma.CustomButtonWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CustomButtonCountAggregateInputType;
    _min?: CustomButtonMinAggregateInputType;
    _max?: CustomButtonMaxAggregateInputType;
};
export type GetCustomButtonAggregateType<T extends CustomButtonAggregateArgs> = {
    [P in keyof T & keyof AggregateCustomButton]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCustomButton[P]> : Prisma.GetScalarType<T[P], AggregateCustomButton[P]>;
};
export type CustomButtonGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CustomButtonWhereInput;
    orderBy?: Prisma.CustomButtonOrderByWithAggregationInput | Prisma.CustomButtonOrderByWithAggregationInput[];
    by: Prisma.CustomButtonScalarFieldEnum[] | Prisma.CustomButtonScalarFieldEnum;
    having?: Prisma.CustomButtonScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CustomButtonCountAggregateInputType | true;
    _min?: CustomButtonMinAggregateInputType;
    _max?: CustomButtonMaxAggregateInputType;
};
export type CustomButtonGroupByOutputType = {
    id: string;
    cardId: string;
    label: string;
    url: string;
    _count: CustomButtonCountAggregateOutputType | null;
    _min: CustomButtonMinAggregateOutputType | null;
    _max: CustomButtonMaxAggregateOutputType | null;
};
export type GetCustomButtonGroupByPayload<T extends CustomButtonGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CustomButtonGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CustomButtonGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CustomButtonGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CustomButtonGroupByOutputType[P]>;
}>>;
export type CustomButtonWhereInput = {
    AND?: Prisma.CustomButtonWhereInput | Prisma.CustomButtonWhereInput[];
    OR?: Prisma.CustomButtonWhereInput[];
    NOT?: Prisma.CustomButtonWhereInput | Prisma.CustomButtonWhereInput[];
    id?: Prisma.StringFilter<"CustomButton"> | string;
    cardId?: Prisma.StringFilter<"CustomButton"> | string;
    label?: Prisma.StringFilter<"CustomButton"> | string;
    url?: Prisma.StringFilter<"CustomButton"> | string;
    card?: Prisma.XOR<Prisma.CardScalarRelationFilter, Prisma.CardWhereInput>;
};
export type CustomButtonOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    cardId?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    card?: Prisma.CardOrderByWithRelationInput;
};
export type CustomButtonWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CustomButtonWhereInput | Prisma.CustomButtonWhereInput[];
    OR?: Prisma.CustomButtonWhereInput[];
    NOT?: Prisma.CustomButtonWhereInput | Prisma.CustomButtonWhereInput[];
    cardId?: Prisma.StringFilter<"CustomButton"> | string;
    label?: Prisma.StringFilter<"CustomButton"> | string;
    url?: Prisma.StringFilter<"CustomButton"> | string;
    card?: Prisma.XOR<Prisma.CardScalarRelationFilter, Prisma.CardWhereInput>;
}, "id">;
export type CustomButtonOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    cardId?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    _count?: Prisma.CustomButtonCountOrderByAggregateInput;
    _max?: Prisma.CustomButtonMaxOrderByAggregateInput;
    _min?: Prisma.CustomButtonMinOrderByAggregateInput;
};
export type CustomButtonScalarWhereWithAggregatesInput = {
    AND?: Prisma.CustomButtonScalarWhereWithAggregatesInput | Prisma.CustomButtonScalarWhereWithAggregatesInput[];
    OR?: Prisma.CustomButtonScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CustomButtonScalarWhereWithAggregatesInput | Prisma.CustomButtonScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"CustomButton"> | string;
    cardId?: Prisma.StringWithAggregatesFilter<"CustomButton"> | string;
    label?: Prisma.StringWithAggregatesFilter<"CustomButton"> | string;
    url?: Prisma.StringWithAggregatesFilter<"CustomButton"> | string;
};
export type CustomButtonCreateInput = {
    id?: string;
    label: string;
    url: string;
    card: Prisma.CardCreateNestedOneWithoutCustomButtonsInput;
};
export type CustomButtonUncheckedCreateInput = {
    id?: string;
    cardId: string;
    label: string;
    url: string;
};
export type CustomButtonUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    card?: Prisma.CardUpdateOneRequiredWithoutCustomButtonsNestedInput;
};
export type CustomButtonUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cardId?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type CustomButtonCreateManyInput = {
    id?: string;
    cardId: string;
    label: string;
    url: string;
};
export type CustomButtonUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type CustomButtonUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cardId?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type CustomButtonListRelationFilter = {
    every?: Prisma.CustomButtonWhereInput;
    some?: Prisma.CustomButtonWhereInput;
    none?: Prisma.CustomButtonWhereInput;
};
export type CustomButtonOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CustomButtonCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    cardId?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
};
export type CustomButtonMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    cardId?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
};
export type CustomButtonMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    cardId?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
};
export type CustomButtonCreateNestedManyWithoutCardInput = {
    create?: Prisma.XOR<Prisma.CustomButtonCreateWithoutCardInput, Prisma.CustomButtonUncheckedCreateWithoutCardInput> | Prisma.CustomButtonCreateWithoutCardInput[] | Prisma.CustomButtonUncheckedCreateWithoutCardInput[];
    connectOrCreate?: Prisma.CustomButtonCreateOrConnectWithoutCardInput | Prisma.CustomButtonCreateOrConnectWithoutCardInput[];
    createMany?: Prisma.CustomButtonCreateManyCardInputEnvelope;
    connect?: Prisma.CustomButtonWhereUniqueInput | Prisma.CustomButtonWhereUniqueInput[];
};
export type CustomButtonUncheckedCreateNestedManyWithoutCardInput = {
    create?: Prisma.XOR<Prisma.CustomButtonCreateWithoutCardInput, Prisma.CustomButtonUncheckedCreateWithoutCardInput> | Prisma.CustomButtonCreateWithoutCardInput[] | Prisma.CustomButtonUncheckedCreateWithoutCardInput[];
    connectOrCreate?: Prisma.CustomButtonCreateOrConnectWithoutCardInput | Prisma.CustomButtonCreateOrConnectWithoutCardInput[];
    createMany?: Prisma.CustomButtonCreateManyCardInputEnvelope;
    connect?: Prisma.CustomButtonWhereUniqueInput | Prisma.CustomButtonWhereUniqueInput[];
};
export type CustomButtonUpdateManyWithoutCardNestedInput = {
    create?: Prisma.XOR<Prisma.CustomButtonCreateWithoutCardInput, Prisma.CustomButtonUncheckedCreateWithoutCardInput> | Prisma.CustomButtonCreateWithoutCardInput[] | Prisma.CustomButtonUncheckedCreateWithoutCardInput[];
    connectOrCreate?: Prisma.CustomButtonCreateOrConnectWithoutCardInput | Prisma.CustomButtonCreateOrConnectWithoutCardInput[];
    upsert?: Prisma.CustomButtonUpsertWithWhereUniqueWithoutCardInput | Prisma.CustomButtonUpsertWithWhereUniqueWithoutCardInput[];
    createMany?: Prisma.CustomButtonCreateManyCardInputEnvelope;
    set?: Prisma.CustomButtonWhereUniqueInput | Prisma.CustomButtonWhereUniqueInput[];
    disconnect?: Prisma.CustomButtonWhereUniqueInput | Prisma.CustomButtonWhereUniqueInput[];
    delete?: Prisma.CustomButtonWhereUniqueInput | Prisma.CustomButtonWhereUniqueInput[];
    connect?: Prisma.CustomButtonWhereUniqueInput | Prisma.CustomButtonWhereUniqueInput[];
    update?: Prisma.CustomButtonUpdateWithWhereUniqueWithoutCardInput | Prisma.CustomButtonUpdateWithWhereUniqueWithoutCardInput[];
    updateMany?: Prisma.CustomButtonUpdateManyWithWhereWithoutCardInput | Prisma.CustomButtonUpdateManyWithWhereWithoutCardInput[];
    deleteMany?: Prisma.CustomButtonScalarWhereInput | Prisma.CustomButtonScalarWhereInput[];
};
export type CustomButtonUncheckedUpdateManyWithoutCardNestedInput = {
    create?: Prisma.XOR<Prisma.CustomButtonCreateWithoutCardInput, Prisma.CustomButtonUncheckedCreateWithoutCardInput> | Prisma.CustomButtonCreateWithoutCardInput[] | Prisma.CustomButtonUncheckedCreateWithoutCardInput[];
    connectOrCreate?: Prisma.CustomButtonCreateOrConnectWithoutCardInput | Prisma.CustomButtonCreateOrConnectWithoutCardInput[];
    upsert?: Prisma.CustomButtonUpsertWithWhereUniqueWithoutCardInput | Prisma.CustomButtonUpsertWithWhereUniqueWithoutCardInput[];
    createMany?: Prisma.CustomButtonCreateManyCardInputEnvelope;
    set?: Prisma.CustomButtonWhereUniqueInput | Prisma.CustomButtonWhereUniqueInput[];
    disconnect?: Prisma.CustomButtonWhereUniqueInput | Prisma.CustomButtonWhereUniqueInput[];
    delete?: Prisma.CustomButtonWhereUniqueInput | Prisma.CustomButtonWhereUniqueInput[];
    connect?: Prisma.CustomButtonWhereUniqueInput | Prisma.CustomButtonWhereUniqueInput[];
    update?: Prisma.CustomButtonUpdateWithWhereUniqueWithoutCardInput | Prisma.CustomButtonUpdateWithWhereUniqueWithoutCardInput[];
    updateMany?: Prisma.CustomButtonUpdateManyWithWhereWithoutCardInput | Prisma.CustomButtonUpdateManyWithWhereWithoutCardInput[];
    deleteMany?: Prisma.CustomButtonScalarWhereInput | Prisma.CustomButtonScalarWhereInput[];
};
export type CustomButtonCreateWithoutCardInput = {
    id?: string;
    label: string;
    url: string;
};
export type CustomButtonUncheckedCreateWithoutCardInput = {
    id?: string;
    label: string;
    url: string;
};
export type CustomButtonCreateOrConnectWithoutCardInput = {
    where: Prisma.CustomButtonWhereUniqueInput;
    create: Prisma.XOR<Prisma.CustomButtonCreateWithoutCardInput, Prisma.CustomButtonUncheckedCreateWithoutCardInput>;
};
export type CustomButtonCreateManyCardInputEnvelope = {
    data: Prisma.CustomButtonCreateManyCardInput | Prisma.CustomButtonCreateManyCardInput[];
    skipDuplicates?: boolean;
};
export type CustomButtonUpsertWithWhereUniqueWithoutCardInput = {
    where: Prisma.CustomButtonWhereUniqueInput;
    update: Prisma.XOR<Prisma.CustomButtonUpdateWithoutCardInput, Prisma.CustomButtonUncheckedUpdateWithoutCardInput>;
    create: Prisma.XOR<Prisma.CustomButtonCreateWithoutCardInput, Prisma.CustomButtonUncheckedCreateWithoutCardInput>;
};
export type CustomButtonUpdateWithWhereUniqueWithoutCardInput = {
    where: Prisma.CustomButtonWhereUniqueInput;
    data: Prisma.XOR<Prisma.CustomButtonUpdateWithoutCardInput, Prisma.CustomButtonUncheckedUpdateWithoutCardInput>;
};
export type CustomButtonUpdateManyWithWhereWithoutCardInput = {
    where: Prisma.CustomButtonScalarWhereInput;
    data: Prisma.XOR<Prisma.CustomButtonUpdateManyMutationInput, Prisma.CustomButtonUncheckedUpdateManyWithoutCardInput>;
};
export type CustomButtonScalarWhereInput = {
    AND?: Prisma.CustomButtonScalarWhereInput | Prisma.CustomButtonScalarWhereInput[];
    OR?: Prisma.CustomButtonScalarWhereInput[];
    NOT?: Prisma.CustomButtonScalarWhereInput | Prisma.CustomButtonScalarWhereInput[];
    id?: Prisma.StringFilter<"CustomButton"> | string;
    cardId?: Prisma.StringFilter<"CustomButton"> | string;
    label?: Prisma.StringFilter<"CustomButton"> | string;
    url?: Prisma.StringFilter<"CustomButton"> | string;
};
export type CustomButtonCreateManyCardInput = {
    id?: string;
    label: string;
    url: string;
};
export type CustomButtonUpdateWithoutCardInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type CustomButtonUncheckedUpdateWithoutCardInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type CustomButtonUncheckedUpdateManyWithoutCardInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type CustomButtonSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    cardId?: boolean;
    label?: boolean;
    url?: boolean;
    card?: boolean | Prisma.CardDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["customButton"]>;
export type CustomButtonSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    cardId?: boolean;
    label?: boolean;
    url?: boolean;
    card?: boolean | Prisma.CardDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["customButton"]>;
export type CustomButtonSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    cardId?: boolean;
    label?: boolean;
    url?: boolean;
    card?: boolean | Prisma.CardDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["customButton"]>;
export type CustomButtonSelectScalar = {
    id?: boolean;
    cardId?: boolean;
    label?: boolean;
    url?: boolean;
};
export type CustomButtonOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "cardId" | "label" | "url", ExtArgs["result"]["customButton"]>;
export type CustomButtonInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    card?: boolean | Prisma.CardDefaultArgs<ExtArgs>;
};
export type CustomButtonIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    card?: boolean | Prisma.CardDefaultArgs<ExtArgs>;
};
export type CustomButtonIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    card?: boolean | Prisma.CardDefaultArgs<ExtArgs>;
};
export type $CustomButtonPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CustomButton";
    objects: {
        card: Prisma.$CardPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        cardId: string;
        label: string;
        url: string;
    }, ExtArgs["result"]["customButton"]>;
    composites: {};
};
export type CustomButtonGetPayload<S extends boolean | null | undefined | CustomButtonDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CustomButtonPayload, S>;
export type CustomButtonCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CustomButtonFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CustomButtonCountAggregateInputType | true;
};
export interface CustomButtonDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CustomButton'];
        meta: {
            name: 'CustomButton';
        };
    };
    findUnique<T extends CustomButtonFindUniqueArgs>(args: Prisma.SelectSubset<T, CustomButtonFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CustomButtonClient<runtime.Types.Result.GetResult<Prisma.$CustomButtonPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CustomButtonFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CustomButtonFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CustomButtonClient<runtime.Types.Result.GetResult<Prisma.$CustomButtonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CustomButtonFindFirstArgs>(args?: Prisma.SelectSubset<T, CustomButtonFindFirstArgs<ExtArgs>>): Prisma.Prisma__CustomButtonClient<runtime.Types.Result.GetResult<Prisma.$CustomButtonPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CustomButtonFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CustomButtonFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CustomButtonClient<runtime.Types.Result.GetResult<Prisma.$CustomButtonPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CustomButtonFindManyArgs>(args?: Prisma.SelectSubset<T, CustomButtonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CustomButtonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CustomButtonCreateArgs>(args: Prisma.SelectSubset<T, CustomButtonCreateArgs<ExtArgs>>): Prisma.Prisma__CustomButtonClient<runtime.Types.Result.GetResult<Prisma.$CustomButtonPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CustomButtonCreateManyArgs>(args?: Prisma.SelectSubset<T, CustomButtonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CustomButtonCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CustomButtonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CustomButtonPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CustomButtonDeleteArgs>(args: Prisma.SelectSubset<T, CustomButtonDeleteArgs<ExtArgs>>): Prisma.Prisma__CustomButtonClient<runtime.Types.Result.GetResult<Prisma.$CustomButtonPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CustomButtonUpdateArgs>(args: Prisma.SelectSubset<T, CustomButtonUpdateArgs<ExtArgs>>): Prisma.Prisma__CustomButtonClient<runtime.Types.Result.GetResult<Prisma.$CustomButtonPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CustomButtonDeleteManyArgs>(args?: Prisma.SelectSubset<T, CustomButtonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CustomButtonUpdateManyArgs>(args: Prisma.SelectSubset<T, CustomButtonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CustomButtonUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CustomButtonUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CustomButtonPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CustomButtonUpsertArgs>(args: Prisma.SelectSubset<T, CustomButtonUpsertArgs<ExtArgs>>): Prisma.Prisma__CustomButtonClient<runtime.Types.Result.GetResult<Prisma.$CustomButtonPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CustomButtonCountArgs>(args?: Prisma.Subset<T, CustomButtonCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CustomButtonCountAggregateOutputType> : number>;
    aggregate<T extends CustomButtonAggregateArgs>(args: Prisma.Subset<T, CustomButtonAggregateArgs>): Prisma.PrismaPromise<GetCustomButtonAggregateType<T>>;
    groupBy<T extends CustomButtonGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CustomButtonGroupByArgs['orderBy'];
    } : {
        orderBy?: CustomButtonGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CustomButtonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomButtonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CustomButtonFieldRefs;
}
export interface Prisma__CustomButtonClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    card<T extends Prisma.CardDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CardDefaultArgs<ExtArgs>>): Prisma.Prisma__CardClient<runtime.Types.Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CustomButtonFieldRefs {
    readonly id: Prisma.FieldRef<"CustomButton", 'String'>;
    readonly cardId: Prisma.FieldRef<"CustomButton", 'String'>;
    readonly label: Prisma.FieldRef<"CustomButton", 'String'>;
    readonly url: Prisma.FieldRef<"CustomButton", 'String'>;
}
export type CustomButtonFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomButtonSelect<ExtArgs> | null;
    omit?: Prisma.CustomButtonOmit<ExtArgs> | null;
    include?: Prisma.CustomButtonInclude<ExtArgs> | null;
    where: Prisma.CustomButtonWhereUniqueInput;
};
export type CustomButtonFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomButtonSelect<ExtArgs> | null;
    omit?: Prisma.CustomButtonOmit<ExtArgs> | null;
    include?: Prisma.CustomButtonInclude<ExtArgs> | null;
    where: Prisma.CustomButtonWhereUniqueInput;
};
export type CustomButtonFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomButtonSelect<ExtArgs> | null;
    omit?: Prisma.CustomButtonOmit<ExtArgs> | null;
    include?: Prisma.CustomButtonInclude<ExtArgs> | null;
    where?: Prisma.CustomButtonWhereInput;
    orderBy?: Prisma.CustomButtonOrderByWithRelationInput | Prisma.CustomButtonOrderByWithRelationInput[];
    cursor?: Prisma.CustomButtonWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CustomButtonScalarFieldEnum | Prisma.CustomButtonScalarFieldEnum[];
};
export type CustomButtonFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomButtonSelect<ExtArgs> | null;
    omit?: Prisma.CustomButtonOmit<ExtArgs> | null;
    include?: Prisma.CustomButtonInclude<ExtArgs> | null;
    where?: Prisma.CustomButtonWhereInput;
    orderBy?: Prisma.CustomButtonOrderByWithRelationInput | Prisma.CustomButtonOrderByWithRelationInput[];
    cursor?: Prisma.CustomButtonWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CustomButtonScalarFieldEnum | Prisma.CustomButtonScalarFieldEnum[];
};
export type CustomButtonFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomButtonSelect<ExtArgs> | null;
    omit?: Prisma.CustomButtonOmit<ExtArgs> | null;
    include?: Prisma.CustomButtonInclude<ExtArgs> | null;
    where?: Prisma.CustomButtonWhereInput;
    orderBy?: Prisma.CustomButtonOrderByWithRelationInput | Prisma.CustomButtonOrderByWithRelationInput[];
    cursor?: Prisma.CustomButtonWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CustomButtonScalarFieldEnum | Prisma.CustomButtonScalarFieldEnum[];
};
export type CustomButtonCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomButtonSelect<ExtArgs> | null;
    omit?: Prisma.CustomButtonOmit<ExtArgs> | null;
    include?: Prisma.CustomButtonInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CustomButtonCreateInput, Prisma.CustomButtonUncheckedCreateInput>;
};
export type CustomButtonCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CustomButtonCreateManyInput | Prisma.CustomButtonCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CustomButtonCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomButtonSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CustomButtonOmit<ExtArgs> | null;
    data: Prisma.CustomButtonCreateManyInput | Prisma.CustomButtonCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CustomButtonIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CustomButtonUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomButtonSelect<ExtArgs> | null;
    omit?: Prisma.CustomButtonOmit<ExtArgs> | null;
    include?: Prisma.CustomButtonInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CustomButtonUpdateInput, Prisma.CustomButtonUncheckedUpdateInput>;
    where: Prisma.CustomButtonWhereUniqueInput;
};
export type CustomButtonUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CustomButtonUpdateManyMutationInput, Prisma.CustomButtonUncheckedUpdateManyInput>;
    where?: Prisma.CustomButtonWhereInput;
    limit?: number;
};
export type CustomButtonUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomButtonSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CustomButtonOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CustomButtonUpdateManyMutationInput, Prisma.CustomButtonUncheckedUpdateManyInput>;
    where?: Prisma.CustomButtonWhereInput;
    limit?: number;
    include?: Prisma.CustomButtonIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CustomButtonUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomButtonSelect<ExtArgs> | null;
    omit?: Prisma.CustomButtonOmit<ExtArgs> | null;
    include?: Prisma.CustomButtonInclude<ExtArgs> | null;
    where: Prisma.CustomButtonWhereUniqueInput;
    create: Prisma.XOR<Prisma.CustomButtonCreateInput, Prisma.CustomButtonUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CustomButtonUpdateInput, Prisma.CustomButtonUncheckedUpdateInput>;
};
export type CustomButtonDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomButtonSelect<ExtArgs> | null;
    omit?: Prisma.CustomButtonOmit<ExtArgs> | null;
    include?: Prisma.CustomButtonInclude<ExtArgs> | null;
    where: Prisma.CustomButtonWhereUniqueInput;
};
export type CustomButtonDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CustomButtonWhereInput;
    limit?: number;
};
export type CustomButtonDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomButtonSelect<ExtArgs> | null;
    omit?: Prisma.CustomButtonOmit<ExtArgs> | null;
    include?: Prisma.CustomButtonInclude<ExtArgs> | null;
};
