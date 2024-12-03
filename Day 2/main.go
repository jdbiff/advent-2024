package main

import (
	"flag"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {

	flag.Parse()
	f := flag.Arg(0)
	d, _ := os.ReadFile(f)

	ls := strings.Split(strings.TrimSpace(string(d)), "\n")

	var sets [][]int

	for _, l := range ls {
		sets = append(sets, transform(strings.Split(l, " "), func(s string) int { v, _ := strconv.Atoi(s); return v }))
	}

	partOneA := transform(sets, func(set []int) int {
		if isSafe(set) {
			return 1
		} else {
			return 0
		}
	})
	partOneB := reduce(partOneA, func(i, j int) int { return i + j }, 0)

	partTwoA := transform(sets, func(set []int) int {

		if isSafe(set) {
			return 1
		}

		for i := range set {
			damped := filter(set, func(val int, idx int) bool { return idx != i })
			if isSafe(damped) {
				return 1
			}
		}

		return 0

	})
	partTwoB := reduce(partTwoA, func(i, j int) int { return i + j }, 0)

	fmt.Printf("p1: %d\np2: %d\n", partOneB, partTwoB)
}

type Slice []int

func transform[T any, R any](s []T, f func(value T) R) []R {
	var result []R
	for _, v := range s {
		result = append(result, f(v))
	}
	return result
}

func reduce(s []int, f func(i, j int) int, initial int) int {
	var acc = initial
	for _, a := range s {
		acc = f(acc, a)
	}
	return acc
}

func filter[T any](s []T, f func(value T, index int) bool) []T {
	var res []T
	for idx, val := range s {
		if f(val, idx) {
			res = append(res, val)
		}
	}
	return res
}

func matchAny[T any](s []T, f func(value T) bool) bool {
	for _, v := range s {
		if f(v) {
			return true
		}
	}

	return false
}

func abs(value int) int {
	if value < 0 {
		return value * -1
	} else {
		return value
	}
}

func sign(v int) int {
	switch true {

	case v > 0:
		return 1
	case v < 0:
		return -1
	default:
		return v

	}

}

func isSameSign(i, j int) bool {
	return sign(i) == sign(j)
}

func isBetween(i, lower, upper int) bool {
	return lower <= i && i <= upper
}

func isSafe(a []int) bool {
	diffs := getDiffs(a)
	return allBetween(diffs, 1, 3) && allSameSign(diffs)
}

func getDiffs(s []int) []int {
	var res []int
	for i := 0; i < len(s)-1; i++ {
		res = append(res, s[i]-s[i+1])
	}
	return res
}

func allSameSign(s Slice) bool {
	for i := 0; i < len(s)-1; i++ {
		if !isSameSign(s[i], s[i+1]) {
			return false
		}
	}
	return true
}

func allBetween(s Slice, lower, upper int) bool {
	for i := 0; i < len(s); i++ {
		if !isBetween(abs(s[i]), lower, upper) {
			return false
		}
	}
	return true
}
