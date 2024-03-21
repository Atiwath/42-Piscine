if [ "$#" -eq 0 ]; then
    echo "No arguments supplied."
    exit 1
fi

for folder_name in "$@"; do
    new_folder="ex$folder_name"
    [ -d "$new_folder" ] || mkdir "$new_folder" && echo "Folder '$new_folder' created."
done

echo "Folders creation completed."
