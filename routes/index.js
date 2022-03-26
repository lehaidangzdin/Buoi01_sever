const express = require('express');
const router = express.Router();
//========================= KHAI BÁO KẾT NỐI DATABASE MONGOOSE DB
const db = "mongodb+srv://danglh0603:Lehaidang123@cluster0.q4scs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const mongoose = require('mongoose');
mongoose.connect(db).catch(error => {
  console.log("co loi xay ra")
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home'});
});
//
router.get('/asia', function(req, res, next) {
  var stData = fs.readFileSync("myFile/data.txt").toString();
  let data = JSON.parse(stData)
  // console.log(data);
  res.render('Asian', { title: 'Asia', data: data});
});
//
router.get('/euro', function(req, res, next) {
  res.render('Euro', { title: 'Euro' });
});
//
router.get('/america', function(req, res, next) {
  res.render('American', { title: 'America' });
});
//
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});
///================================== HIỂN THỊ CÁC LOẠI DỮ LIỆU LÊN HTML
router.get('/hot', function(req, res, next) {
  const  diaChi = "Nam tu liem - Ha Noi";
  const mang = [1,2,4,1,4,6,2,0];
  const sinhVien = {name: "leHaiDang",sinhNhat:"01-01-2002",sdt:"0124124"};
  const danhSach = [
    {name: "leHaiDang1",sinhNhat:"01-01-2002",sdt:"0124124"},
    {name: "leHaiDang2",sinhNhat:"01-01-2002",sdt:"0124124"},
    {name: "leHaiDang3",sinhNhat:"01-01-2002",sdt:"0124124"},
    {name: "leHaiDang4",sinhNhat:"01-01-2002",sdt:"0124124"}];

  // bien kieu ket hop
  var thongTin= {
    name:"lhd",
    yeuThich:"dwdwd",
    danhSachBanGai:[
      {name: "leHaiDang5",sinhNhat:"01-01-2002",sdt:"0124124"},
      {name: "leHaiDang6",sinhNhat:"01-01-2002",sdt:"0124124"},
      {name: "leHaiDang7",sinhNhat:"01-01-2002",sdt:"0124124"},
      {name: "leHaiDang8",sinhNhat:"01-01-2002",sdt:"0124124"}]
  }
  res.render('hot', { title: 'Hot',diaChi: diaChi, mang: mang,sinhVien: sinhVien,danhSach: danhSach, thongTin:thongTin });
});
//
router.get('/form', function(req, res, next) {
  res.render('Form', { title: 'Form' , message :""});
});
//// ===================================== ĐỌC GHI FILE
// const fs = require("fs");
// const {render} = require("ejs");
// router.post("/testForm",function (req,res){
//   const name = req.body.ten;
//   const phoneNumber = req.body.soDienThoai;
//   const content = req.body.content;
//
//   fs.appendFile("myFile/uploads.txt","Tên: "+name+
//       "\nSố điện thoại: "+phoneNumber+
//       "\nNội dung: "+content +"\n",function (err){
//     if (err){
//       res.render("form",{message:err})
//     }else {
//       res.render("form",{message:"Đã lưu thông tin!"});
//     }
//   });
// });
// ================================SLIDE 7 KẾT NỐI MONGOOSE DATABASE
////khai báo Schema(giống model trong java)
var studentSch = new mongoose.Schema({
  name:"string",
  sdt:"string",
  add:"string",
});
// khai báo schema với thư viện moogoose
var Student = mongoose.model("student",studentSch);
router.post("/Student",function (req,res){
  const name = req.body.ten;
  const phoneNumber = req.body.soDienThoai;
  const add = req.body.Address;

  console.log(name +" = "+phoneNumber +" = "+add);

  const data = new Student({
    name: name,
    sdt: phoneNumber,
    add: add
  });
  var mess = "" ;
  // add du lieu
  data.save(function (err){
     if (err == null){
       mess = "them thanh cong!";

     }else {
       mess="them that bai";
       console.log(err);
     }
    res.render('Form', { title: 'Form' , message :mess})
  });

  // get dulieu
  Student.find({},function (err,data){
    console.log(data);
    res.render('Form', { title: 'Form' , data:data,message:""});
  });// getall data
// xoa data
//   Student.deleteOne({_id:""},function (err){
//
//   });
  // sua data
  Student.updateOne({_id:""},{name:"hhhhh",sdt:"88888888",add:"oooooo"},function (err){

  })


});
///






module.exports = router;
