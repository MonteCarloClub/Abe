<template>
  <Card title="我的文件">
    <el-table
      ref="multipleTable"
      size="mini"
      :data="files"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="文件名" width="200">
        <template slot-scope="scope">{{ scope.row.dataName }}</template>
      </el-table-column>
      <el-table-column prop="dataSize" label="文件大小" />
      <el-table-column prop="channelName" label="所在通道" />
      <el-table-column label="上传日期">
        <template slot-scope="scope">
          <span>{{ scope.row.createdTime.split(".")[0] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更改日期">
        <template slot-scope="scope">
          <span>{{ scope.row.modifiedTime.split(".")[0] }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="...">
        <template slot-scope="scope">
          <el-tooltip
            v-for="item in operations"
            :key="item.id"
            class="item"
            effect="light"
            placement="bottom-start"
            style="margin-right: 5px"
            :content="item.content"
          >
            <el-link
              :icon="item.icon"
              style="font-size: 18px; color: #409eff"
              @click="handleClick(scope.row, item.id)"
            />
          </el-tooltip>
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="files.length"
      :page-size="6"
      size="mini"
      :style="{ marginTop: '20px', textAlign: 'center' }"
      @current-change="handlePageChange"
    />
  </Card>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";

export default {
  name: "Mine",
  components: {
    Card,
  },
  data() {
    return {
      files: [],
    };
  },

  methods: {
    handlePageChange() {
      
    }
  },
};
</script>