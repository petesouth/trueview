angular.module('liquidGauge',[])
    .controller('liquidGaugeCtrl', function($scope, influxDBService,$routeParams, $location) {
    	 
        liquidGauge = function (){     
            var config4 = liquidFillGaugeDefaultSettings();
            config4.circleThickness = 0.15;
            config4.circleColor = "#3c9ccf";
            config4.textColor = "#3c9ccf";
            config4.waveTextColor = "#99cbe6";
            config4.waveColor = "#99cbe6";
            config4.waveWarnColor = "#ffff80";
            config4.waveErrColor = "#ff8080"; 
            config4.textVertPosition = 0.8;
            config4.waveAnimateTime = 1000;
            config4.waveHeight = 0.05;
            config4.waveAnimate = true;
            config4.waveRise = false;
            config4.waveHeightScaling = false;
            config4.textSize = 0.75;
            config4.waveCount = 3;
            gUtil.chartIncommingRequestParameterDecoratorPie($scope, $routeParams);
            
            
           
       
            $scope.loadGraphs = function(responses){
            	$scope.updateGraphs(responses);
                
				if ($scope.pollFrequency > 0) {
					gUtil.startPolling($scope, $scope.pollFrequency);
				}
            };

			$scope.updateGraphs = function(responses){
				
				$("#liquidG").empty();
				$("#liquidG").append('<svg id="fillgauge5"></svg>');
				
				$scope.gauge5 = loadLiquidFillGauge("fillgauge5", 0, config4);
            	var dataOrb = gUtil.getDataOrbFromResultSetsPie($scope, responses);
                $scope.gauge5.update(dataOrb.lastNumberValue);
            };
            
			$scope.stopPollingEvent = function($scope) {
				$("#liquidG").empty();
				console.log("MANUALLY REMOVING------------------");
			};
			

            angular.element(document).ready(function () {
            	gUtil.asyncLoadGraphs($scope);
            });
            
        
            



        }
        
        liquidGauge();

    }); 