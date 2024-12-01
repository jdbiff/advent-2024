package main

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	fmt.Printf("AoC Day 1\n")

	data, _ := os.ReadFile("input.txt")

	stringArr := strings.Split(strings.TrimSpace(string(data)), "\n")

	var left, right []int

	for _, pair := range stringArr {
		nums := strings.Split(pair, "   ")
		left = append(left, parseInt(nums[0]))
		right = append(right, parseInt(nums[1]))
	}

	pOne := partOne(left, right)
	pTwo := partTwo(left, right)

	fmt.Printf("%d\n", pOne)
	fmt.Printf("%d\n", pTwo)

}

func partOne(left, right []int) int {
	sort.Slice(left, func(i, j int) bool {
		return left[i] < left[j]
	})

	sort.Slice(right, func(i, j int) bool {
		return right[i] < right[j]
	})

	var diff int

	for idx := range left {
		diff += abs(left[idx] - right[idx])
	}

	return diff
}

func partTwo(left, right []int) int {

	var similarity int

	for _, i := range left {
		count := 0
		for _, j := range right {
			if j == i {
				count += 1
			}
		}
		similarity += i * count
	}

	return similarity
}

func parseInt(str string) int {
	p, _ := strconv.ParseInt(str, 10, 32)
	return int(p)
}

func abs(a int) int {
	if a < 0 {
		return a * -1
	} else {
		return a
	}
}
