<!doctype html>
  <html class="no-js">
  <head>
    <meta charset="utf-8">
    <title>TrueView UI</title>
    <link rel="stylesheet" href="{{ elixir('css/all.css') }}" type="text/css" />
    <link rel="stylesheet" href="{{ elixir('css/app.css') }}" type="text/css" />
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=RobotoDraft:100,100italic,300,300italic,400,500,700,900,400italic">
    <script src="/monitcommando/js/lib/jquery/2.2.0/jquery-2.2.0.js"></script>
    <script src="/monitcommando/js/lib/bootstrap/bootstrap.file-input.js"></script>
    
    
  </head>
  <body class="container" style="color: white;">
  	 <div class="dashboard-container padded-content-page">
    <div class="md-padding"  style="overflow: hidden;">
        <md-card class="md-fn10-theme">
            <md-toolbar class="md-theme-fn10 md-fn10-theme">
                <h2 class="md-toolbar-tools">
                    <span>Upload</span>
                </h2>
            </md-toolbar>

            <md-content class="md-theme-fn10 md-fn10-theme" style="overflow: hidden;">
                <form name="upload file" class="md-padding" action="/api/uploadfile" method="post" enctype="multipart/form-data">
                    <div>
                         <md-input-container layout="row">
                            <label style="color: black;">description:</label>
                            <input name="desc" type="input" style="color: black;">
                        </md-input-container>
                    </div>
                    <div>
                         <md-input-container layout="row">
                            <label style="color: black;">org_id:</label>
                            <input name="org_id" type="input"  style="color: black;">
                        </md-input-container>
                    </div>
                    <div>
                         <md-input-container layout="row">
                            <label style="color: black;">filetype:</label>
                            <input name="filetype" type="input"  style="color: black;">
                        </md-input-container>
                    </div>
                    <div>
                        <md-input-container layout="row">
                            <input name="uploadedFile" type="file">
                        </md-input-container>
                    </div>
                     <div>
                     	<br/>
                     </div>
                    <div>
                        <md-input-container layout="row">
                            <input style="color: black;" type="submit" value="upload">
                        </md-input-container>
                    </div>
                    
                        
                </form>
            </md-content>

        </md-card>
       
    </div>
</div>
	
	
	<script>
    $(function() {
     	$('.file-inputs').bootstrapFileInput();
    });
    </script>
    
  </body>
</html>
