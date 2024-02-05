<html>
<style>
.center {
    text-align: center;
}
.button {
    background-color: #0D97D4;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
}
</style>
    <body>
        <span>
            Thanks for creating an account with TrueView.
            Please confirm your email and activate your account. 
        </span>
        <div class="center">
            <a href={{ URL::to('confirm_email/' . $confirmation_code) }}><button class="button">Confirm Now</button></a><br/>
        </div>

        <!--div class="center">
            <img src="http://10.247.1.13/assets/images/trueview_icon.svg" height="45" width="45"></img>
        </div-->
    </body>
</html>
