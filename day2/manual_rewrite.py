def find_average(numbers):
    total = 0

    for num in numbers:
        total += num

    return total / len(numbers)


numbers = [5, 10, 15]

print(find_average(numbers))