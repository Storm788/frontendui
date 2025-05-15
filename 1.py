# Example A: Simplify
def a(x):
    def b(y):
        def c(z):
            return y + z
        return c
    return b(x)









# Example B: What d is?
def d(f):
    def e(*args, **kwargs):
        def q():
            return f(*args, **kwargs)
        return q
    return e









# Example C: What asM is?
def compose(f, *middlewares):
    def run(input):
        def call_next(i, input):
            if i < len(middlewares):
                return middlewares[i](input, lambda new_input: call_next(i + 1, new_input))
            else:
                return f(input)
        return call_next(0, input)
    return run

def asM(f):
    def r(data, next):
        return next(f(data))
    return r

# Example D: Explain add1
def i(f):
    def r(s):
        for m in s:
            yield f(m)
    return r

@i
def add1(x):
    return x + 1