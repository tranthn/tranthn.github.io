#!/bin/bash
pushd md-notes > /dev/null

for file in *md; do
	markdown $file > ../views/${file%.*}.html
done

popd > /dev/null