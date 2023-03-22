import time
import multiprocessing


def func1(s):
    print(s)
    arr = [i for i in range(1000000)]
    sum = 0
    for i in arr:
        sum += i
    return sum


def func2(s):
    print(s)
    arr = [i for i in range(1000000)]
    sum = 0
    for i in arr:
        sum += i

    return sum


if __name__ == '__main__':

    start = time.time()
    for i in range(8):
        s = func2(i)
        print(s)

    print(time.time() - start)



    start = time.time()
    with multiprocessing.Pool() as pool:
        result = pool.map(func1,[i for i in range(8)])
        print(result)

    pro = []



    for proc in pro:
        proc.join()

    print(time.time() - start)