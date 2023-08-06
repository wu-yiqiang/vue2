<template>
  <div class='Pagenation'>
    <el-pagination background @size-change='handleSizeChange' @current-change='handleCurrentChange'
      :current-page.sync='pageNumer' :page-sizes='[10, 30, 50, 100]' :page-size='pageSize'
      layout='total, sizes, prev, pager, next, jumper' :total='pages.total'>
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'Pagenation',
  components: {},
  props: {
    pages: {
      required: true,
      type: Object,
      default: {},
    },
  },
  mixins: [],
  data () {
    return {
      pageNumer: 1,
      pageSize: 10,
      theme: 'blue',
    };
  },
  computed: {
    themeVars () {
      let color = '';
      if (this.theme === 'blue') color = '#004F8F';
      if (this.theme === 'red') color = '#D63246';
      if (this.theme === 'golden') color = '#7A6E66';
      if (this.theme === 'blue') color = '#007C8A';
      return {
        '--theme': color,
      };
    },
  },
  watch: {
    pages () {
      this.pageNumer = this.pages.pageNumer;
      this.pageSize = this.pages.pageSize;
    },
  },
  mounted () {
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val;
      this.pageNumer = 1;
      const page = {pageSize: this.pageSize, pageNumer: this.pageNumer};
      this.$emit('pager-change', page);
    },
    handleCurrentChange (val) {
      this.pageNumer = val;
      const page = {pageSize: this.pageSize, pageNumer: this.pageNumer};
      this.$emit('pager-change', page);
    },
  },
};
</script>
<style lang="scss">
.Pagenation {
  margin-top: 20px;
}
</style>
