#!/bin/bash

target=""
version=""

# オプション解析を行う関数
parse_options() {
    for arg in "$@"; do
        case $arg in
            --target=*)
                target="${arg#*=}"
                ;;
            --version=*)
                version="${arg#*=}"
                ;;
        esac
    done
}

# オプション解析の呼び出し
parse_options "$@"

# 必須オプションのチェック
if [[ -z $target || -z $version ]]; then
    echo "Please input target extension or version."
    exit 1
fi


# run example: ./extract_specific_changelog.sh --target=back-up-firestore-to-storage --version=0.0.4
extract_specific_version() {
    local is_matching_version=false
    local heading=""
    local content=""

    while IFS= read -r line; do
        if [[ $line =~ ^## ]]; then
            if [[ $is_matching_version = true ]]; then
                break
            fi
            heading="$line"
            local v=$(echo "$line" | sed 's/^## *//')
            if [[ $v == *"$version"* ]]; then
                is_matching_version=true
            fi
        elif [[ $is_matching_version = true ]]; then
            if [[ $line =~ ^- ]]; then
                content+="- ${line#*- }"$'\n'
            fi
        fi
    done < "./$target/CHANGELOG.md"

    if [[ $is_matching_version = true ]]; then
        echo "$heading"
        echo ""
        echo "$content"
    else
        echo "$version does not found in CHANGELOG."
    fi
}

extract_specific_version