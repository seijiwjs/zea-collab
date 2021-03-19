# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [5.1.1](https://github.com/ZeaInc/zea-collab/compare/v5.1.0...v5.1.1) (2021-02-18)


### Bug Fixes

* clear callbacks when leaving a room ([5f01043](https://github.com/ZeaInc/zea-collab/commit/5f01043c4895165369f8d613e5a2b91b40c3b2ad))
* PRIVATE_ACTIONS const ([f0a092b](https://github.com/ZeaInc/zea-collab/commit/f0a092bc95cfaf0a6b70cb192566c7076f954649))

## [5.1.0](https://github.com/ZeaInc/zea-collab/compare/v5.0.4...v5.1.0) (2021-02-17)


### Features

* build package for Node.js only ([0057d7b](https://github.com/ZeaInc/zea-collab/commit/0057d7bdf79eb765abd5936d338d30bbe16dc8ba))

### [5.0.4](https://github.com/ZeaInc/zea-collab/compare/v5.0.3...v5.0.4) (2021-02-15)

* Avatar now displays a nameplate with initials if no image is provided.

### Bug Fixes

* Regression displaying VR controllers on Avatars.

### [5.0.2] (2021-01-11)

### Features

* 3D Avatar now displays initials if profile image is not available.

### Bug Fixes
* Regression prevented VR controllers being displayed on Avatars.
* Regression prevented Avatar from loading VR HMD asset.

### [5.0.1] (2021-01-07)

### Bug Fixes

* Avatar now correctly loads the HMD VLAAsset and adjusts the nameplate distance
* Session generates a warning if users try to emit events prior to joining a room.

## [5.0.0] (2020-12-17)


### ⚠ BREAKING CHANGES

* **npm:** Raw imports are no longer supported.

### Features

* add libraries registry compatibility ([#45](https://github.com/ZeaInc/zea-collab/issues/45)) ([971f7b3](https://github.com/ZeaInc/zea-collab/commit/971f7b3d4a3b6992d5fd7b93cfe40cee39f593f1)), closes [#46](https://github.com/ZeaInc/zea-collab/issues/46)
* Added nameplate to the back of the Avatar. ([fc38e1d](https://github.com/ZeaInc/zea-collab/commit/fc38e1d27be29ed4f0ee7bac50fed04a2234770b))
* Avatar now caches the viewXfo and the focalDistance ([4eeb616](https://github.com/ZeaInc/zea-collab/commit/4eeb6168fe4beeb372b6aacf5ca1f123428dccdf))
* Consider non-browser envs as localhost ([390e748](https://github.com/ZeaInc/zea-collab/commit/390e748b1c43c72a5b0d3080972e206784a300c7))
* implemented 'directAttention' feature to force all users to look at something. ([b8a55f4](https://github.com/ZeaInc/zea-collab/commit/b8a55f44f0731f42a96c4e80e6e8ee0cfcfc0b6a))
* implemented a 'follow-me' mode where all session users follow a specific guide user. ([b9580f1](https://github.com/ZeaInc/zea-collab/commit/b9580f16ebc815a0d7c495d320c14a92a741a6fb))
* SessionSync now exposes all the userData as a property to apps can access all the avatars. ([5db765a](https://github.com/ZeaInc/zea-collab/commit/5db765a6285b9d71f54717dd729490d148957a1f))
* SessionSync options defaults to object ([7833206](https://github.com/ZeaInc/zea-collab/commit/78332064a148459d20f516d4805f9c19ff116535))


### Bug Fixes

* A roomId is required ([e6db3e6](https://github.com/ZeaInc/zea-collab/commit/e6db3e6a2d2d965febc8eaa2bc805f208f5e327d))
* Removed static dependency on zea-engine. Now Collab can be used without the engine loaded. ([cd7b7c4](https://github.com/ZeaInc/zea-collab/commit/cd7b7c4a688b75dfff67c6f5438e0734c3e5aa01))
* Removed static dependency on zea-engine. Now Collab can be used without the engine loaded. ([c518009](https://github.com/ZeaInc/zea-collab/commit/c51800995375b8b1fe85f494977815236c553dbb))


### build

* **npm:** Add UMD support ([#29](https://github.com/ZeaInc/zea-collab/issues/29)) ([9124081](https://github.com/ZeaInc/zea-collab/commit/9124081afe6a69f80e497a1ac65047f23fa1f4b6)), closes [#30](https://github.com/ZeaInc/zea-collab/issues/30)

## [4.1.0] (2020-09-30)


### Features

* Add collision protection ([6e39aac](https://github.com/ZeaInc/zea-collab/commit/6e39aacd8a7e8cdb81b138f0d8588a76193640c3)), closes [#39](https://github.com/ZeaInc/zea-collab/issues/39)
* SessionSync options defaults to object ([7833206](https://github.com/ZeaInc/zea-collab/commit/78332064a148459d20f516d4805f9c19ff116535))

## [4.0.0] (2020-09-17)


### ⚠ BREAKING CHANGES

* **npm:** Raw imports are no longer supported.

### build

* **npm:** Add UMD support ([#29](https://github.com/ZeaInc/zea-collab/issues/29)) ([9124081](https://github.com/ZeaInc/zea-collab/commit/9124081afe6a69f80e497a1ac65047f23fa1f4b6)), closes [#30](https://github.com/ZeaInc/zea-collab/issues/30)

## [3.4.0] (2020-08-26)


### Features

* Formalized documentation for collab lib ([bc26484](https://github.com/ZeaInc/zea-collab/commit/bc264841bfc97df49943d5cfbd54e99a9ef8a4ed))


### Bug Fixes

* addressed deprecation warnings since zea-engine v1.2 ([5453aab](https://github.com/ZeaInc/zea-collab/commit/5453aab70267036765c1f2886b1d3424611f3040))
* addressed thrown exception when using collab as an es6 module loaded directly in the browser. ([758b109](https://github.com/ZeaInc/zea-collab/commit/758b109c6db2f47991d19bba5033d5083ae300fa))
* Changed license to MIT ([cbb7498](https://github.com/ZeaInc/zea-collab/commit/cbb7498ae6c3225cda9e0e106abe4186bad6e931))
* Docs search now have their own namespace ([66990c8](https://github.com/ZeaInc/zea-collab/commit/66990c8f4f32f75cf6421b201c12a218570ee73a))
* Fixed bug causing avatars to not appear correctly for newly joined users. ([6fc34e7](https://github.com/ZeaInc/zea-collab/commit/6fc34e76317b23fc2901e5a79a1c439e9807f327))
* Fixed minor deprecation warning. ([9484e34](https://github.com/ZeaInc/zea-collab/commit/9484e34ddfd677d1519559e9bb351a05fe04abf0))
* fixed regressions in imports after zea-engine 1.2.0 ([b9870b4](https://github.com/ZeaInc/zea-collab/commit/b9870b4fd8e79aaf43c791719f0e197118c056a5))
* Search functionality is now defaulting instead of specifying the entire paths ([22cdeaf](https://github.com/ZeaInc/zea-collab/commit/22cdeaf3373295c5534edfc3709ebe2eebf14a08))
