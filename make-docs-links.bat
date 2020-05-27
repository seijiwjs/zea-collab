mkdir "docs/tutorials/libs"

mkdir "docs/tutorials/libs/zea-engine"
mklink /J "docs/tutorials/libs/zea-engine/dist" "node_modules/@zeainc/zea-engine/dist"
mklink /J "docs/tutorials/libs/zea-engine/public-resources" "node_modules/@zeainc/zea-engine/public-resources"

mkdir "docs/tutorials/libs/zea-ux"
mklink /J "docs/tutorials/libs/zea-ux/dist" "node_modules/@zeainc/zea-ux/dist"

mkdir "docs/tutorials/libs/zea-collab"
mklink /J "docs/tutorials/libs/zea-collab/dist" "dist"