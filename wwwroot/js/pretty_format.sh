#!/bin/bash

COMMAND=""

# find . -name '*.ts*'|xargs rm

for filename in $(find src -name '*.ts*'); do
    COMMAND="${COMMAND} \"prettier.cmd --write --config .prettierrc ${PWD}/${filename}\""
done


# "npx prettier --write --config .prettierrc " $PWD/

COMMAND="concurrently --max-processes 4 --kill-others-on-fail --raw ${COMMAND}"

${COMMAND}



    # COMMAND="${COMMAND} npx prettier --write --config .prettierrc $PWD/$filename"

    # COMMAND+=$PWD/$filename
    # COMMAND+=" \" "
    
    # echo ${FILES}
    # echo $FILES
    # echo "$FILES"
