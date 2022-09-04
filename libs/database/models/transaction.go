package models

import (
	"testing"
)

func TestModelsGo(t *testing.T) {
	result := ModelsGo("works")
	if result != "ModelsGo works" {
		t.Error("Expected ModelsGo to append 'works'")
	}
}
