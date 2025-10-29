const fs = require('fs');
const path = require('path');

const cmakeListsPath = path.resolve(
  __dirname,
  '../node_modules/react-native-safe-area-context/android/src/main/jni/CMakeLists.txt',
);

let cmakeListsContent = fs.readFileSync(cmakeListsPath, 'utf8');

const originalContent =
  'if (REACTNATIVE_MERGED_SO)\n  target_link_libraries(\n          ${LIB_TARGET_NAME}\n          fbjni\n          jsi\n          reactnative\n  )\nelse()\n  target_link_libraries(\n          ${LIB_TARGET_NAME}\n          fbjni\n          folly_runtime\n          glog\n          jsi\n          react_codegen_rncore\n          react_debug\n          react_nativemodule_core\n          react_render_core\n          react_render_debug\n          react_render_graphics\n          react_render_mapbuffer\n          react_render_componentregistry\n          react_utils\n          rrc_view\n          turbomodulejsijni\n          yoga\n  )\nendif()';

const modifiedContent =
  'if (REACTNATIVE_MERGED_SO)\n  target_link_libraries(\n          ${LIB_TARGET_NAME}\n          fbjni\n          jsi\n          reactnative\n          c++_shared\n  )\nelse()\n  target_link_libraries(\n          ${LIB_TARGET_NAME}\n          fbjni\n          folly_runtime\n          glog\n          jsi\n          react_codegen_rncore\n          react_debug\n          react_nativemodule_core\n          react_render_core\n          react_render_debug\n          react_render_graphics\n          react_render_mapbuffer\n          react_render_componentregistry\n          react_utils\n          rrc_view\n          turbomodulejsijni\n          yoga\n          c++_shared\n  )\nendif()';

if (cmakeListsContent.includes(originalContent)) {
  cmakeListsContent = cmakeListsContent.replace(originalContent, modifiedContent);
  fs.writeFileSync(cmakeListsPath, cmakeListsContent, 'utf8');
  console.log('Patch applied to CMakeLists.txt');
} else {
  console.log('CMakeLists.txt already patched');
}
