<template>
    <div class='TableFormItem'>
        <el-form-item v-for='(searchItem, index) in opts' :key='index' :prop='searchItem.prop' :label='searchItem.label'
          :label-width='searchItem.labelWidth' :rules='searchItem.rules' :required='searchItem.required'>
          <el-input v-if='searchItem.type === "input"' size='small' v-model.trim='searchForm[searchItem.prop]'
            v-bind='searchItem.attrs' v-on='searchItem.on'
            :placeholder='searchItem.attrs.placeholder ? searchItem.attrs.placeholder : `请输入${searchItem.label}`' />
          <el-select v-if='searchItem.type === "select"' size='small' v-model='searchForm[searchItem.prop]'
            :rules='searchItem.rules' v-bind='searchItem.attrs'
            :placeholder='searchItem.attrs.placeholder ? searchItem.attrs.placeholder : `请选择${searchItem.label}`'
            v-on='searchItem.on'>
            <el-option v-for='(optItem, i) in searchItem.opts' :key='i' :label='optItem.label' :value='optItem.value' />
          </el-select>
          <el-date-picker v-if='searchItem.type === "date"' v-model='searchForm[searchItem.prop]' type='date' size='small'
            v-bind='searchItem.attrs' v-on='searchItem.on' />
            <el-date-picker v-if='searchItem.type === "range-date"' v-model='searchForm[searchItem.prop]' type='daterange' size='small' range-separator='-' :start-placeholder='searchItem.attrs.startPlaceholder' :end-placeholder='searchItem.attrs.endPlaceholder' v-bind='searchItem.attrs' v-on='searchItem.on' />
        </el-form-item>
    </div>
  </template>

  <script>
  export default {
    name: 'TableFormItem',
    components: {},
    props: {
      opts: {
        required: true,
        type: Array,
        default: [],
      },
      searchForm: {
        required: true,
        type: Object,
        default: {},
      },
    },
    mixins: [],
    data () {
      return {
      };
    },
    computed: {
    },
    watch: {},
    created () { },
    mounted () {
    },
    methods: {
    },
  };
  </script>
  <style lang="scss">
  .TableFormItem {
    display: inline;
  }
  </style>
