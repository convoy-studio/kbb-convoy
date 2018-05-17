<?php 

$email = $_POST['email'];
echo $email;
// $curl = curl_init();

// curl_setopt($curl, CURLOPT_URL,"https://prince2me.us17.list-manage.com/subscribe/post-json");
// curl_setopt($curl, CURLOPT_POST, 1);
// curl_setopt($curl, CURLOPT_POSTFIELDS, "u=9e7bef0f8dd6822f62aadefad&id=12a2387190&MERGE0=".$email."");

// // in real life you should use something like:
// // curl_setopt($curl, CURLOPT_POSTFIELDS, 
// //          http_build_query(array('postvar1' => 'value1')));

// // receive server response ...
// curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

// $response = curl_exec($curl);
// $err = curl_error($curl);

// curl_close($curl);

// if ($err) {
//   echo "cURL Error #:" . $err;
// } else {
//   echo $response;
// }