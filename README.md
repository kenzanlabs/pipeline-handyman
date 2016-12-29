## pipeline-handyman


## Information

| Package       | Description   | Version|
| ------------- |:-------------:| -----:|
| pipeline-handyman| Pipeline with resources used in several pipes | 1.0.0 |

# Overview

Gulp pipeline that provides several utility methods to facilitate the creation of other pipelines.

## Install

`npm install pipeline-handyman --save-dev`

## Usage

### clean

#### Asynchronous

This function provides a way to delete directories asynchronously, by passing an array of globs.

```javascript
var handyman = require('pipeline-handyman');

handyman.clean(['./dest'])
  .then(function (arrayOfDeletedFilePaths) {
    // do something after files are deleted
  })
  .catch(function (err) {
    // do something with an error
  });
```


#### Synchronous

This function provides a way to delete directories synchronously, by passing an array of globs.

```javascript
var handyman = require('pipeline-handyman');

handyman.cleanSync(['./dest']); // returns an array of file paths that were removed.
```


### getPackageName

This functions allows you to obtain the package name. This can be useful, for example, during minification processes 
when you need to name the build packages.

```javascript
var handyman = require('pipeline-handyman');

handyman.getPackageName();
```

### log

This functions provides a way to log messages in the terminal. You can get feedback from the gulp process on your 
terminal through personalized messages.

```javascript
var handyman = require('pipeline-handyman');

handyman.log('Your message');
```

### mergeConfig

This function facilitates the process of merging two config objects. It is widely use to take the configuration from the 
user provided one and merge it with default configuration establish by the pipeline.

```javascript
var handyman = require('pipeline-handyman');

pipelineConfig = handyman.mergeConfig(defaultConfig, newConfig);

```

### slugify

This functions provides a way to convert strings to a consist snake case format, eg `myString` => `my-string`.

```javascript
var handyman = require('pipeline-handyman');

var myStringSlugified = handyman.slugify('myString');  //return `my-string`
```



## LICENSE
Copyright 2015 Kenzan

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
