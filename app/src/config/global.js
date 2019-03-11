if (process.env.NODE_ENV === 'development') {
  global.__DEV__ = true;
} else {
  global.__DEV__ = false;
}