#-----------------------------------------------------------
#Name:      imgBlock.sh
#Purpose:   画像データを白黒(0,1)データに変換
#Start:     sh imgBlock.sh <png or jpeg file> <分割カラム数>
#Author:    @_munro_
#Created:   27/3/2016
#Copyright: (c) @_munro_ 2016
#Licence:
#----------------------------------------------------------

#!/bin/sh
convert -geometry $2x$2 -compress none $1 $1.pbm
cat $1.pbm|tail -n +3|xargs|sed 's/ //g'
rm $1.pbm
