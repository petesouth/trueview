<?php

return [
    /*
    "driver" => "smtp",
    "host" => "mailtrap.io",
    "port" => 2525,
    "from" => array(
        "address" => "admin@tv.com",
        "name" => "TV"
    ),
    "username" => "95fd2f745a5bb9",
    "password" => "06d2930a8375c5",
    "sendmail" => "/usr/sbin/sendmail -bs",
    "pretend" => false
     */

    'driver' => 'smtp',
    'host' => 'smtp.gmail.com',
    'port' => 587,
    'from' => array('address' => 'admin@tv.com', 'name' => 'TrueView'),
    'encryption' => 'tls',
    'username' => 'testing4tv@gmail.com',
    'password' => 'ix4life!',
    'sendmail' => '/usr/sbin/sendmail -bs',
    'pretend' => false,
];
