/* @flow */

// Legacy "tableMetadata" etc

import type { Database, DatabaseId } from "metabase/meta/types/Database";
import type { Table, TableId } from "metabase/meta/types/Table";
import type { Field, FieldId } from "metabase/meta/types/Field";
import type { Segment, SegmentId } from "metabase/meta/types/Segment";
import type { Metric, MetricId } from "metabase/meta/types/Metric";

export type Metadata = {
  databases: { [id: DatabaseId]: DatabaseMetadata },
  tables: { [id: TableId]: TableMetadata },
  fields: { [id: FieldId]: FieldMetadata },
  metrics: { [id: MetricId]: MetricMetadata },
  segments: { [id: SegmentId]: SegmentMetadata },
};

export type DatabaseMetadata = Database & {
  tables: TableMetadata[],
  tables_lookup: { [id: TableId]: TableMetadata },
};

export type TableMetadata = Table & {
  db: DatabaseMetadata,

  fields: FieldMetadata[],
  fields_lookup: { [id: FieldId]: FieldMetadata },

  segments: SegmentMetadata[],
  metrics: MetricMetadata[],

  aggregation_options: AggregationOption[],
  breakout_options: BreakoutOption,
};

export type FieldMetadata = Field & {
  table: TableMetadata,
  target: FieldMetadata,

  operators: FilterOperator[],
  operators_lookup: { [key: FilterOperatorName]: FilterOperator },
};

export type SegmentMetadata = Segment & {
  table: TableMetadata,
};

export type MetricMetadata = Metric & {
  table: TableMetadata,
};

export type FieldValue = {
  name: string,
  key: string,
};

export type FilterOperatorName = string;

export type FilterOperator = {
  name: FilterOperatorName,
  verboseName: string,
  moreVerboseName: string,
  fields: FilterOperatorField[],
  multi: boolean,
  placeholders?: string[],
  validArgumentsFilters: ValidArgumentsFilter[],
};

export type FilterOperatorField = {
  type: string,
  values: FieldValue[],
};

export type ValidArgumentsFilter = (field: Field, table: Table) => boolean;

type FieldsFilter = (fields: Field[]) => Field[];

export type AggregationOption = {
  name: string,
  short: string,
  fields: Field[],
  validFieldsFilters: FieldsFilter[],
};

export type BreakoutOption = {
  name: string,
  short: string,
  fields: Field[],
  validFieldsFilter: FieldsFilter,
};

export type FieldOptions = {
  count: number,
  fields: Field[],
  fks: {
    field: Field,
    fields: Field[],
  },
};

import Dimension from "metabase-lib/lib/Dimension";

export type DimensionOptions = {
  count: number,
  dimensions: Dimension[],
  fks: Array<{
    field: FieldMetadata,
    dimensions: Dimension[],
  }>,
};
