/**
 * Structure for handling communication on value updates from {@link LiveData}.
 */
 interface Observer<T> {
    (value: T): void
}

export default Observer