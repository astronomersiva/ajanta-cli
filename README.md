# ajanta-cli

This is a command line utility that I use to generate resized images
for various resolutions and to also get pixelated versions that I
use for lazy loading with [ajanta](https://github.com/astronomersiva/ajanta).

### Usage

* `npm install -g ajanta-cli`
* Run `ajanta` from any directory. Example, `inputDir=images ajanta`.

- `inputDir` - Specify the input directory, defaults to `process.cwd()`.
- `resolutions` - A comma separated list of image resolutions.
- `webp` - If webp images are needed. Defaults to `true`.

### License

MIT © [Sivasubramanyam A](https://sivasubramanyam.me)
