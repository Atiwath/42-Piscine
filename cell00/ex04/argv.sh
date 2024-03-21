if [ $# -eq 0 ]; then
    echo "No arguments detected"
else
    count=1 
    while [ $count -le 3 ]; do
        if [ $count -le $# ]; then
            echo "${!count}" 
        else
            break
        fi
        ((count++))
    done
fi
