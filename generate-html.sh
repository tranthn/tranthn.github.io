#!/bin/bash
pushd md-notes > /dev/null

for file in *md; do
	markdown $file > ../views/raw/_${file%.*}.html
done

popd > /dev/null