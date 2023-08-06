<template>
  <div class='Table'>
    <el-form ref='searchForm' :model='searchForm' :inline='true'>
      <TableFormItem :opts='opts1' :search-form='searchForm' />
      <div v-if='opts.length' :class='foldState ? "unfold" : "fold"'>
        <TableFormItem :opts='opts' :search-form='searchForm' />
      </div>
      <span v-if='isInline' class='inline-btn-box'>
        <el-button size='large' type='primary' @click='handleQuery'> 搜索 </el-button>
        <el-button size='large' @click='handleReset'> 重置 </el-button>
        <!-- slot -->
      </span>
      <div v-else class='btn-box'>
        <el-button size='large' type='primary' @click='handleQuery'> 搜索 </el-button>
        <el-button size='large' @click='handleReset'> 重置 </el-button>
        <el-button v-if='isFold && foldState' size='large' type='text' @click='handleUnfold'> 展开<i class='el-icon-arrow-down' />
        </el-button>
        <el-button v-if='isFold && !foldState' size='large' type='text' @click='handleFold'> 折叠<i class='el-icon-arrow-up' />
        </el-button>
        <!-- slot -->
      </div>
    </el-form>
    <!-- List -->
    <div class='List' v-loading='loading'>
      <!-- List operation -->
      <div class='opeartion'>
        <div class='left-box'>
          <slot name='searchOptLeft' />
        </div>
        <div class='right-box'>
          <slot name='searchOptRight' />
        </div>
      </div>
      <el-table :data='tableDatas' border style='width: 100%'>
        <el-table-column v-for='(column, index) in columns' :key='index' :type='column.type' :prop='column.prop'
          :width='column.width' :label='column.label' align='center'>
          <template slot-scope='{row}'>
            <slot v-if='column.slot && column.slot !== "opt"' :name='column.slot' :row='row' />
            <slot v-if='column.slot && column.slot === "opt"' :name='"opt"'>
              <el-button type='primary' size='mini' icon='el-icon-edit' @click='handleEditor(row)'>编辑</el-button>
              <el-button type='danger' size='mini' icon='el-icon-delete' @click='handleDelete(row)'>删除</el-button>
            </slot>
            <span v-if='!column.slot'>{{row[column.prop]}}</span>
          </template>
        </el-table-column>
      </el-table>
      <Pagenation v-if='tableDatas.length' :pages='page' @pager-change='handlePager' />
    </div>
  </div>
</template>

<script>
import Pagenation from './Pagenation.vue';
import TableFormItem from './table-form-item.vue';
import {debounce} from 'lodash';
export default {
  name: 'Table',
  components: {Pagenation, TableFormItem},
  props: {
    searchOptions: {
      required: true,
      type: Array,
      default: [],
    },
    loading: {
      required: true,
      type: Boolean,
      default: true,
    },
    tableDatas: {
      required: true,
      type: Array,
      default: [],
    },
    columns: {
      required: true,
      type: Array,
      default: [],
    },
    pages: {
      required: true,
      type: Object,
      default: {},
    },
    defaultFoldNum: {
      required: false,
      type: Number,
      default: 4,
    },
  },
  mixins: [],
  data () {
    return {
      searchForm: {},
      opts: [],
      opts1: [],
      foldState: true,
      page: {
        pageNumer: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  computed: {
    isFold () {
      if (this.searchOptions.length > this.defaultFoldNum) return true;
      return false;
    },
    isInline () {
      if (this.searchOptions.length < 4) return true;
      return false;
    },
  },
  watch: {},
  created () { },
  mounted () {
    this.init();
  },
  methods: {
    isDisplay (index) {
      if (this.defaultFoldNum === index) return true;
      return false;
    },
    init () {
      this.handleFold();
      this.handlePage();
      this.handleReset();
    },
    handlePage () {
      this.page = {pageNumer: this.pages.pageNumer, pageSize: this.pages.pageSize, total: this.pages.total};
      // eslint-disable-next-line no-console
      console.log('kkk', this.page);
    },
    handleQuery: debounce(function () {
      // eslint-disable-next-line no-console
      console.log('query  params');
      this.$refs['searchForm'].validate(valid => {
        if (!valid) return;
        this.$emit('search', {searchForm: this.searchForm, pager: this.page});
      });
    }, 800),
    handlePager (pager) {
      this.$emit('search', {searchForm: this.searchForm, pager: pager});
    },
    handleReset () {
      let form = {};
      for (const key in this.searchOptions) {
        if (Object.hasOwnProperty.call(this.searchOptions, key)) {
          const item = this.searchOptions[key];
          form[item.prop] = item.default;
        }
      }
      this.searchForm = form;
      this.handlePage();
      this.$emit('search', {searchForm: this.searchForm, pager: this.page});
    },
    handleFold () {
      this.foldState = true;
      this.opts1 = this.searchOptions.slice(0, this.defaultFoldNum);
      this.opts = this.searchOptions.slice(this.defaultFoldNum, this.searchOptions.length);
    },
    handleUnfold () {
      this.foldState = false;
    },
    getSearchParams () {
      return this.searchForm;
    },
    handleUpdate () {
      this.$emit('update', {searchForm: this.searchForm, pager: this.page});
    },
    handleDelete (item) {
      this.$emit('delete', item);
    },
    handleEditor (item) {
      this.$emit('editor', item);
    },
  },
};
</script>
<style lang="scss">
.Table {
  .el-form {
    padding: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    .fold {
      max-height: 800px;
      transition-timing-function: ease;
      overflow: hidden;
      transition: 1.6s;
    }
    .unfold {
      max-height: 0;
      transition-timing-function: ease;
      overflow: hidden;
      transition: 0.8s;
    }
    .el-form-item {
      width: 25%;
      margin-right: 0;
      display: inline-flex;
    label {
      margin-left: 10px;
      width: 80px;
    }
    .el-form-item__content {
      flex: 1;
      .el-select,
      .el-range-editor,
      .el-input {
        width: 100%;
      }
    }
    }
  }
  .inline-btn-box {
    margin-left: 30px;
  }

  .btn-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }

}

.List {
  width: 100%;
  padding: 20px;
  background-color: #fff;
  .opeartion {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .left-box,
    .right-box {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
}
</style>
