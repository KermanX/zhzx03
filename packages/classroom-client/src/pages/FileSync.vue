<script lang="ts">
import { writeFile } from "fs";
export default {
    data() {
        return {
            path: 'C:\\Users\\HONOR\\Desktop\\test.txt',
            content: "..."
        }
    },
    methods: {
        submit() {
            writeFile(this.path, this.content, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    }
}
</script>

<template>
    <el-form label-position="top">
        <el-form-item label="Path">
            <el-input v-model="path" />
        </el-form-item>
        <el-form-item label="Content">
            <el-input type="textarea" v-model="content" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">OK</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped>
</style>
