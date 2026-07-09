numbers = [10, 20, 30, 40, 50]


def calculate_sum_average(number_list):
    total = 0

    for number in number_list:
        total += number

    average = total / len(number_list)

    return total, average


result_sum, result_average = calculate_sum_average(numbers)

print("Numbers:", numbers)
print("Sum:", result_sum)
print("Average:", result_average)