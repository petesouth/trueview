curl -POST -v --form "uploadedFile=@test.json;filename=test.json"  --form "desc=test" --form "org_id=12345" --form "filetype=1" https://localhost:800/api/uploadfile?api_token=iVwvefFomngJIvh0ZF72kJXLhyeoZdol0yDy4uXDj0gMyBz8ZgkwK112Umst



curl -POST -v --form "uploadedFile=@somefile.txt;filename=somefile.txt"  --form "desc=test" --form "org_id=12345" --form "filetype=1" http://192.168.43.46:8000/api/uploadfile?api_token=iVwvefFomngJIvh0ZF72kJXLhyeoZdol0yDy4uXDj0gMyBz8ZgkwK112Umst


curl -POST -v --form "uploadedFile=@somefile.txt;filename=somefile.txt"  --form "desc=test" --form "org_id=12345" --form "filetype=1" http://TRUE_VIEW_SERVER/api/uploadfile?api_token=iVwvefFomngJIvh0ZF72kJXLhyeoZdol0yDy4uXDj0gMyBz8ZgkwK112Umst
