#!/usr/bin/bash

# Hàm xóa file hoặc folder
# param 1: url thư mục đích
# param 2: tên file và folder ở thư mục đích muốn giữ lại

urlDest=$1
excludeFiles=$2

#cắt chuỗi theo dấu ;
arrExcludeFile=($(echo $excludeFiles | tr ";" "\n"))

#kiểm tra mảng có chứa phần tử truyền vào không 
containsElement () {
    for name in ${arrExcludeFile[@]}
    do [[ "$name" == "$1" ]] && return 1; done
    return 0
}

#xóa file
for file in $urlDest
do
    containsElement $(basename $file)
    retval=$?
    if [ "$retval" == 0 ]
    then
        rm -rf $file
    fi
done