<template>
    <div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>


        <h1>Book Manager</h1>
        <el-form :inline="true" :model="book" class="demo-form-inline">
            <el-form-item label="图书名称">
                <el-input v-model="book.name" placeholder="请输入书名"></el-input>
            </el-form-item>
            <el-form-item label="图书价格">
                <el-input v-model.number="book.price" type="number" placeholder="请输入价格"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addBook">添加图书</el-button>
            </el-form-item>
        </el-form>

        <el-table
                :data="books"
                style="width: 80%">
            <el-table-column
                    prop="id"
                    label="ID"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="图书名称"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="图书价格">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="book">
                    <el-button @click="deleteBook(book.row)" type="text" size="small">删除</el-button>
                    <el-button @click="dialogVisible=true" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>

        </el-table>
        <h2>总价格： {{priceTotal}}</h2>

    </div>
</template>

<script>
    // import _ from 'lodash'

    export default {
        name: "BookManger",
        data(){
            return {
                maxId:2,
                book:{name:'',price:''},
                baseurl:"http://localhost:3000/books/",
                dialogVisible:false,
                books:[{id:1,name:"book1",price:200},
                    {id:2,name:"book2",price:230}]
            }
        },
        mounted(){
            fetch(this.baseurl)
                .then(res=>res.json())
                .then(bs => this.books = bs)
        },
        methods:{
            deleteBook(book){
                window.console.log(book)

                //let request = require('request');
                let myurl = this.baseurl + "/"+book.id;
                // request({
                //     url: myurl,
                //     method: "DELETE",
                //     headers: {
                //         "content-type": "application/json",
                //     },
                //     body: '{}'
                // }, function(error, response) {
                //     if (!error && response.statusCode == 200) {
                //
                //         fetch("http://localhost:3000/books")
                //             .then(res=>res.json())
                //             .then(bs => this.books = bs);
                //         alert("Del Book Successful.");
                //     } else {
                //         alert("Del Book Error.")
                //     }
                // });
                fetch(myurl,{
                    method:"DELETE",
                    headers:{
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({})
                }).then(res=>res.json())
                    .then(nb=>{
                        //window.console.log(nb);
                        if(!nb.code) {
                            let index=this.books.findIndex(item=>item.id==book.id)
                            this.books.splice(index,1)
                        }
                    })


            },
            addBook(){
                // this.book.id=++this.maxId
                // let bk=_.cloneDeep(this.book)
                // this.books.push(bk)
                // var request = require('request');
                // request({
                //     url: "http://localhost:3000/books/add",
                //     method: "PUT",
                //     json: true,
                //     headers: {
                //         "content-type": "application/json",
                //     },
                //     body: this.book
                // }, function(error, response) {
                //     if (!error && response.statusCode == 200) {
                //         fetch("http://localhost:3000/books")
                //             .then(res=>res.json())
                //             .then(bs => this.books = bs);
                //         alert("Add Book Successful.");
                //     } else {
                //         alert("Add Book Error.")
                //     }
                // });
                fetch(this.baseurl,{
                    method:"PUT",
                    headers:{
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(this.book)
                }).then(res=>res.json())
                .then(nb=>this.books.push(nb))

            },
            handleClose(){

            }

        },
        computed:{
            priceTotal(){
                return this.books.reduce((prev,book)=>prev+book.price,0)
            }
        }
    }
</script>

<style scoped>

</style>